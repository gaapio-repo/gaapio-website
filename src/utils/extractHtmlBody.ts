/** Extract the HTML content from EDGAR raw text, stripping the SGML wrapper */
export function extractHtmlBody(raw: string): string {
  // Try to find actual HTML content
  const htmlMatch = raw.match(/<HTML[\s\S]*<\/HTML>/i);
  if (htmlMatch) return htmlMatch[0];
  const bodyMatch = raw.match(/<BODY[\s\S]*<\/BODY>/i);
  if (bodyMatch) return `<html><head><style>body{font-family:system-ui,-apple-system,sans-serif;font-size:14px;line-height:1.7;padding:32px;max-width:100%;color:#333;}</style></head>${bodyMatch[0]}</html>`;

  // Plain text — format with proper typography for SEC staff letters
  const escaped = raw
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const lines = escaped.split('\n');
  let html = '';
  let inList = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (inList) { html += '</ol>'; inList = false; }
      html += '<br>';
      continue;
    }
    const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
    if (numMatch) {
      if (!inList) { html += '<ol style="margin:0.5em 0 0.5em 1.5em;padding:0;">'; inList = true; }
      html += `<li style="margin-bottom:0.5em;">${numMatch[2]}</li>`;
      continue;
    }
    if (inList) { html += '</ol>'; inList = false; }
    if (trimmed.length < 60 && !trimmed.endsWith('.') && !trimmed.endsWith(',')) {
      html += `<p style="margin:1.2em 0 0.3em 0;font-weight:600;">${trimmed}</p>`;
    } else {
      html += `<p style="margin:0 0 0.5em 0;">${trimmed}</p>`;
    }
  }
  if (inList) html += '</ol>';

  return `<html><head><style>
    body { font-family: system-ui, -apple-system, sans-serif; font-size: 14px; line-height: 1.7; padding: 32px; max-width: 100%; color: #333; }
  </style></head><body>${html}</body></html>`;
}
