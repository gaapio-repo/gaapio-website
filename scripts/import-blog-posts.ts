/**
 * Import blog posts from blog/*.md or content/blog/*.md into Supabase.
 * Supports YAML frontmatter and the **Key:** value metadata format.
 * Posts are imported as drafts (is_published: false). Toggle published in admin when ready.
 *
 * Requires: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local
 * Run: npm run blog:import
 */

import { config } from 'dotenv';
config({ path: '.env.local' });
config();

import { createClient } from '@supabase/supabase-js';
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';
import { marked } from 'marked';
import matter from 'gray-matter';

const BLOG_DIRS = [join(process.cwd(), 'blog'), join(process.cwd(), 'content', 'blog')];

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Parse **Key:** value pairs from metadata block */
function parseMetadataBlock(block: string): Record<string, string> {
  const meta: Record<string, string> = {};
  const regex = /\*\*([^*]+):\*\*\s*(.+?)(?=\n\*\*|$)/gs;
  let m;
  while ((m = regex.exec(block)) !== null) {
    meta[m[1].trim().toLowerCase()] = m[2].trim();
  }
  return meta;
}

/** Extract title from first # heading in content */
function extractTitle(content: string): { title: string; body: string } {
  const match = content.match(/^#\s+(.+?)(?:\n|$)/m);
  if (match) {
    const title = match[1].trim();
    const body = content.replace(/^#\s+.+?\n+/, '').trim();
    return { title, body };
  }
  return { title: '', body: content };
}

/** Parse date from "March 17, 2026" or "ASAP" etc */
function parsePublishDate(dateStr: string): string | null {
  if (!dateStr || /asap|draft|tbd/i.test(dateStr)) return null;
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? null : d.toISOString();
}

/** Strip trailing Word count / Status line */
function stripTrailingMeta(content: string): string {
  return content.replace(/\n*---\s*\n*\*Word count:.*\*?\s*$/s, '').trim();
}

/** Parse markdown file - supports both YAML frontmatter and **Key:** value format */
function parseMarkdownFile(raw: string): { title: string; slug: string; excerpt: string | null; content: string; category: string | null; published_at: string | null } | null {
  // Try YAML frontmatter first (content/blog format)
  const fmResult = matter(raw);
  if (fmResult.data && typeof fmResult.data.title === 'string') {
    const title = fmResult.data.title;
    const slug = (fmResult.data.slug as string) || generateSlug(title);
    const html = marked.parse(stripTrailingMeta(fmResult.content.trim())) as string;
    return {
      title,
      slug,
      excerpt: (fmResult.data.excerpt as string) || null,
      content: html,
      category: (fmResult.data.category as string) || null,
      published_at: parsePublishDate((fmResult.data.published_at as string) || ''),
    };
  }

  // Parse **Key:** value format (blog/ format)
  const parts = raw.split(/\n---\s*\n/);
  const firstBlock = parts[0] || '';
  const contentBlock = parts.slice(1).join('\n---\n').trim();

  if (!contentBlock) return null;

  const meta = parseMetadataBlock(firstBlock);
  const excerpt = meta['excerpt'] || null;
  const category = meta['pillar'] || meta['content pillar'] || null;
  const publishDate = meta['publish date'] || meta['suggested publish date'] || null;

  // Title: "Post #N — Blog / Educational" in first block is metadata, not the real title.
  // Use content block's first # heading for "Post #N" format; use first block's # for others (e.g. COSO).
  let title = '';
  let body = contentBlock;
  const titleInFirst = firstBlock.match(/^#\s+(.+?)(?:\n|$)/m);
  const titleInContent = extractTitle(contentBlock);
  const isPostNumberFormat = titleInFirst && /^Post\s*#\d+/i.test(titleInFirst[1].trim());
  if (titleInFirst && !isPostNumberFormat) {
    title = titleInFirst[1].trim();
    body = contentBlock;
  } else if (titleInContent.title) {
    title = titleInContent.title;
    body = titleInContent.body;
  }
  if (!title) return null;

  const slug = generateSlug(title);
  const cleanBody = stripTrailingMeta(body);
  const html = marked.parse(cleanBody) as string;

  return {
    title,
    slug,
    excerpt,
    content: html,
    category,
    published_at: parsePublishDate(publishDate),
  };
}

async function importPosts() {
  const dryRun = process.argv.includes('--dry-run');
  const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!dryRun && (!supabaseUrl || !supabaseKey)) {
    console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.');
    console.error('Add them to .env.local or pass when running:');
    console.error('  SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... npm run blog:import');
    process.exit(1);
  }

  const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

  let blogDir: string | null = null;
  for (const dir of BLOG_DIRS) {
    try {
      await readdir(dir);
      blogDir = dir;
      break;
    } catch {
      continue;
    }
  }

  if (!blogDir) {
    console.error('Error: No blog folder found. Create blog/ or content/blog/ and add .md files.');
    process.exit(1);
  }

  const files = await readdir(blogDir);
  const mdFiles = files.filter((f) => f.endsWith('.md') && !f.toLowerCase().startsWith('readme'));
  if (mdFiles.length === 0) {
    console.log(`No .md files found in ${blogDir}/`);
    return;
  }

  if (dryRun) console.log(`[DRY RUN] Parsing ${mdFiles.length} file(s) from ${blogDir}/\n`);

  console.log(`Found ${mdFiles.length} markdown file(s) in ${blogDir}/. Importing...\n`);

  for (const file of mdFiles) {
    const filePath = join(blogDir, file);
    const raw = await readFile(filePath, 'utf-8');
    const parsed = parseMarkdownFile(raw);

    if (!parsed) {
      console.warn(`  Skipping ${file}: could not parse title`);
      continue;
    }

    const { title, slug, excerpt, content, category, published_at } = parsed;

    const wordCount = content.replace(/<[^>]+>/g, '').trim().split(/\s+/).filter(Boolean).length;
    const readingTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

    const postData = {
      title,
      slug,
      excerpt,
      content,
      featured_image: null,
      category,
      author: 'Zack Larsen, CPA',
      reading_time: readingTime,
      is_published: false,
      is_featured: false,
      published_at,
    };

    if (dryRun) {
      console.log(`  Would import: ${title} (${slug})`);
      continue;
    }

    const { data: existing } = await supabase!
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase!.from('blog_posts').update(postData).eq('id', existing.id);
      if (error) {
        console.error(`  Error updating ${file}:`, error.message);
      } else {
        console.log(`  Updated: ${title} (${slug})`);
      }
    } else {
      const { error } = await supabase!.from('blog_posts').insert(postData);
      if (error) {
        console.error(`  Error inserting ${file}:`, error.message);
      } else {
        console.log(`  Imported: ${title} (${slug})`);
      }
    }
  }

  console.log('\nDone. Go to admin → Blog Posts to publish when ready.');
}

importPosts().catch((err) => {
  console.error(err);
  process.exit(1);
});
