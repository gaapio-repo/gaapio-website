---
title: Example Blog Post
slug: example-blog-post
excerpt: A brief description that appears on the blog listing page.
published_at: 2025-03-20
category: Best Practices
author: Zack Larsen, CPA
reading_time: 5 min read
featured_image:
is_featured: false
---

# Introduction

This is an example blog post written in Markdown. Place your `.md` files in the `content/blog/` folder, then run:

```bash
npm run blog:import
```

Posts are imported as **drafts** by default. Go to the admin panel and toggle "Published" when you're ready to make a post live.

## Frontmatter options

- **title** (required): Post title
- **slug** (optional): URL slug — auto-generated from title if omitted
- **excerpt** (optional): Short description for listing pages
- **published_at** (optional): Date for display when published (YYYY-MM-DD)
- **category** (optional): e.g., "Accounting Standards", "Best Practices"
- **author** (optional): Defaults to "Zack Larsen, CPA"
- **reading_time** (optional): e.g., "5 min read"
- **featured_image** (optional): URL or path to image
- **is_featured** (optional): Show on featured section (default: false)

## Markdown content

Write your content below the frontmatter using standard Markdown. The import script converts it to HTML automatically.

- Bullet points work
- **Bold** and *italic* text
- [Links](https://gaapio.com) too
