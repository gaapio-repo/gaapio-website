# Blog Posts (Markdown)

Add `.md` files to `blog/` or `content/blog/` to import them. The script checks `blog/` first.

## Supported formats

**YAML frontmatter** (content/blog/):
```yaml
---
title: Post Title
slug: url-slug
excerpt: Short description
---
```

**Metadata block** (blog/):
```
# Post #4 — Blog / Educational
**Publish Date:** March 17, 2026
**Pillar:** AI + Judgment
**Excerpt:** Short description...
---

# Actual Article Title

Content starts here...
```

## Workflow

1. Add `.md` files to `blog/` or `content/blog/`
2. Run `npm run blog:import` to import into Supabase
3. Go to **Admin → Blog Posts** and toggle **Published** when ready

## Setup

Add to `.env.local` (get from Supabase Dashboard → Project Settings → API):

```
SUPABASE_URL="https://your-project.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
```

## Frontmatter

```yaml
---
title: Post Title (required)
slug: url-slug              # optional, auto-generated from title
excerpt: Short description  # optional
published_at: 2025-03-20    # optional, for display when published
category: Best Practices   # optional
author: Zack Larsen, CPA   # optional
reading_time: 5 min read   # optional
featured_image: /url      # optional
is_featured: false        # optional
---
```

Write your content below the frontmatter using standard Markdown.
