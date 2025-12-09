import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

// Configuration
const LIVE_URL = 'https://pestcontrolnoida.in/api/posts'; // Public API
const DEST_FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), '../data/posts.ts');

console.log(`[Sync] Fetching live posts from ${LIVE_URL}...`);

https.get(LIVE_URL, (res) => {
    let data = '';

    // A chunk of data has been received.
    res.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received.
    res.on('end', () => {
        try {
            const posts = JSON.parse(data);
            console.log(`[Sync] Downloaded ${posts.length} posts.`);

            // Format for TypeScript file
            const fileContent = `import { BlogPost } from '../types';

export const initialPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};
`;

            fs.writeFileSync(DEST_FILE, fileContent);
            console.log(`[Sync] Successfully updated ${DEST_FILE}`);
            console.log(`[Sync] You can now run the build script to prerender these posts.`);

        } catch (e) {
            console.error('[Sync] Error parsing JSON response:', e.message);
        }
    });

}).on("error", (err) => {
    console.error("[Sync] Error: " + err.message);
});
