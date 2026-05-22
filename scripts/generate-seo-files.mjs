import fs from "node:fs";
import path from "node:path";

const publicDirectory = path.join(process.cwd(), "public");
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
const localPort = process.env.PORT || "3000";
const siteUrl = configuredSiteUrl || `http://localhost:${localPort}`;

const robotsContent = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;

const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${siteUrl}/</loc>
  </url>
  <url>
    <loc>${siteUrl}/privacy</loc>
  </url>
  <url>
    <loc>${siteUrl}/personal-data-consent</loc>
  </url>
</urlset>
`;

fs.mkdirSync(publicDirectory, { recursive: true });
fs.writeFileSync(path.join(publicDirectory, "robots.txt"), robotsContent);
fs.writeFileSync(path.join(publicDirectory, "sitemap.xml"), sitemapContent);

console.log(`SEO files generated for ${siteUrl}`);
