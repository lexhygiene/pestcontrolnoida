import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import http from 'http';
import serveHandler from 'serve-handler';

// -- Configuration --
const BUILD_DIR = 'dist';
const PORT = 4173;
const BASE_URL = `http://localhost:${PORT}`;

// -- Get Directory Names (ESM fix) --
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// -- Routes to Prerender --
// 1. Static Routes
const routes = [
    '/',
    '/about',
    '/services',
    '/blog',
    '/contact',
    '/privacy',
    '/terms',
    '/thank-you'
];

// 2. Dynamic Routes (Extract from data/posts.ts)
const postsFilePath = path.join(ROOT_DIR, 'data', 'posts.ts');
let postsContent = '';
try {
    postsContent = fs.readFileSync(postsFilePath, 'utf8');
} catch (e) {
    console.warn('[Prerender] Could not read data/posts.ts, skipping dynamic routes.');
}

// Regex to find slugs (e.g., slug: "my-post-slug")
const slugRegex = /slug:\s*["']([^"']+)["']/g;
let match;
const blogSlugs = [];
while ((match = slugRegex.exec(postsContent)) !== null) {
    blogSlugs.push(match[1]);
}

// Regex to find categories
const categoryRegex = /category:\s*["']([^"']+)["']/g;
const categories = new Set();
while ((match = categoryRegex.exec(postsContent)) !== null) {
    // Only add if it looks like a valid string
    if (match[1] && match[1].length > 1) {
        categories.add(match[1].toLowerCase().replace(/\s+/g, '-'));
        // Note: We need to match how the app generates URLs. 
        // If App uses "exact category naming", we might need better logic.
        // But for now let's assume standard slugification or raw.
    }
}

// Add Blog Routes
blogSlugs.forEach(slug => routes.push(`/blog/${slug}`));

// Add Category Routes
// In App.tsx: <Route path="/category/:category" ... />
// We need to know what the valid URLs are. 
// If data/posts.ts says category: "Termite Control", the link is likely /category/Termite%20Control or /category/termite-control?
// Let's assume the user links to them somehow.
// I'll skip auto-adding categories to avoid 404s if I guess wrong, unless I'm sure.
// Let's safe-guard:
// categories.forEach(cat => routes.push(`/category/${cat}`));


console.log(`[Prerender] Found ${routes.length} routes to render.`);

// -- Start Static Server --
const server = http.createServer((request, response) => {
    return serveHandler(request, response, {
        public: path.join(ROOT_DIR, BUILD_DIR),
        rewrites: [
            { source: '**', destination: '/index.html' } // SPA Fallback
        ]
    });
});

server.listen(PORT, async () => {
    console.log(`[Prerender] Server started on ${BASE_URL}`);

    try {
        // -- Launch Puppeteer --
        const browser = await puppeteer.launch({
            headless: "new"
        });
        const page = await browser.newPage();

        // -- Crawl Routes --
        for (const route of routes) {
            const url = `${BASE_URL}${route}`;
            console.log(`[Prerender] Rendering: ${route}...`);

            try {
                await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

                // Wait a bit for any lazy images or hydration
                // new Promise(r => setTimeout(r, 500)); 

                const html = await page.content();

                // Determine File Path
                // e.g. /about -> dist/about/index.html
                // e.g. /     -> dist/index.html
                const relativePath = route === '/' ? 'index.html' : `${route.substring(1)}/index.html`;
                const filePath = path.join(ROOT_DIR, BUILD_DIR, relativePath);
                const dirPath = path.dirname(filePath);

                if (!fs.existsSync(dirPath)) {
                    fs.mkdirSync(dirPath, { recursive: true });
                }

                fs.writeFileSync(filePath, html);
                console.log(`            Saved to ${relativePath}`);

            } catch (error) {
                console.error(`[Prerender] Failed to render ${route}:`, error.message);
            }
        }

        await browser.close();
    } catch (err) {
        console.error('[Prerender] Fatal Error:', err);
    } finally {
        server.close();
        console.log('[Prerender] Completed!');
        process.exit(0);
    }
});
