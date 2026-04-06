import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// App project (where comment letter data lives)
const SUPABASE_URL = Deno.env.get('APP_SUPABASE_URL') || 'https://pcujepwgtvxhwguqekpu.supabase.co';
const SUPABASE_ANON_KEY = Deno.env.get('APP_SUPABASE_ANON_KEY')
  || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjdWplcHdndHZ4aHdndXFla3B1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYwNzM4MjQsImV4cCI6MjA4MTY0OTgyNH0.-QfS-rOp8IL6VFDUlsCMBHIaoFj7ILROrO2RWtBALCU';
const SITE_URL = 'https://gaapio.com';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204 });
  }

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Fetch all accounting-relevant letter slugs and dates
    const { data: letters, error } = await supabase
      .from('sec_comment_letters')
      .select('slug, date_filed')
      .eq('accounting_relevant', true)
      .not('slug', 'is', null)
      .order('date_filed', { ascending: false });

    if (error) throw error;

    // Fetch topic slugs from the stats view
    const { data: topics, error: topicError } = await supabase
      .from('sec_comment_letter_topic_stats')
      .select('topic')
      .order('letter_count', { ascending: false });

    if (topicError) throw topicError;

    // Build XML
    const urls: string[] = [];

    // Individual letter pages
    const seenSlugs = new Set<string>();
    for (const letter of (letters || [])) {
      if (!letter.slug || seenSlugs.has(letter.slug)) continue;
      seenSlugs.add(letter.slug);

      const lastmod = letter.date_filed
        ? `<lastmod>${letter.date_filed}</lastmod>`
        : '';

      urls.push(`  <url>
    <loc>${SITE_URL}/comment-letters/${escapeXml(letter.slug)}</loc>
    ${lastmod}
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`);
    }

    // Topic pages
    for (const topic of (topics || [])) {
      const slug = topicToSlug(topic.topic);
      urls.push(`  <url>
    <loc>${SITE_URL}/comment-letters/topics/${escapeXml(slug)}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`;

    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (err) {
    return new Response(`<?xml version="1.0" encoding="UTF-8"?><error>${err.message}</error>`, {
      status: 500,
      headers: { 'Content-Type': 'application/xml' },
    });
  }
});

function topicToSlug(topic: string): string {
  return topic
    .toLowerCase()
    .replace(/\s*—\s*/g, '-')
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
