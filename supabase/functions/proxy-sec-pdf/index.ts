import { corsHeaders } from '../_shared/cors.ts';

const ALLOWED_HOSTS = ['www.sec.gov', 'sec.gov', 'efts.sec.gov'];

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const url = new URL(req.url);
  const pdfUrl = url.searchParams.get('url');

  if (!pdfUrl) {
    return new Response(JSON.stringify({ error: 'Missing url parameter' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // Only proxy SEC URLs
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(pdfUrl);
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid URL' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  if (!ALLOWED_HOSTS.includes(parsedUrl.hostname)) {
    return new Response(JSON.stringify({ error: 'Only SEC URLs are allowed' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const response = await fetch(pdfUrl, {
      headers: {
        'User-Agent': 'Gaapio/1.0 jace@gaapio.com',
        'Accept': 'application/pdf,*/*',
      },
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: `SEC returned ${response.status}` }), {
        status: response.status,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const pdfData = await response.arrayBuffer();

    return new Response(pdfData, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/pdf',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Failed to fetch PDF' }), {
      status: 502,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
