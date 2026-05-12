import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const SITE_URL = 'https://www.eluvie.com';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

type StaticRoute = { path: string; priority: string; changefreq: string };

const STATIC_ROUTES: StaticRoute[] = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', priority: '0.8', changefreq: 'weekly' },
  { path: '/diagnostic', priority: '0.8', changefreq: 'monthly' },
  { path: '/privacy', priority: '0.6', changefreq: 'yearly' },
  { path: '/terms', priority: '0.6', changefreq: 'yearly' },
];

const escapeXml = (value: string) =>
  value.replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' }[c] as string)
  );

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, language, updated_at, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) throw error;

    const seen = new Set<string>();
    const urls: string[] = [];

    for (const route of STATIC_ROUTES) {
      const loc = `${SITE_URL}${route.path}`;
      seen.add(loc);
      urls.push(
        `  <url><loc>${escapeXml(loc)}</loc><priority>${route.priority}</priority><changefreq>${route.changefreq}</changefreq></url>`
      );
    }

    for (const p of posts ?? []) {
      const loc = `${SITE_URL}/blog/${p.slug}`;
      if (seen.has(loc)) continue;
      seen.add(loc);
      const lastmod = (p.updated_at ?? p.published_at) as string | null;
      const lastmodTag = lastmod ? `<lastmod>${escapeXml(new Date(lastmod).toISOString())}</lastmod>` : '';
      urls.push(
        `  <url><loc>${escapeXml(loc)}</loc>${lastmodTag}<priority>0.6</priority><changefreq>monthly</changefreq></url>`
      );
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>`;

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      },
      status: 200,
    });
  } catch (err) {
    console.error('generate-sitemap error', err);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});