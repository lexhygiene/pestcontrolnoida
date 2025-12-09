require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

console.log('---------------------------------------------------');
console.log('   SERVER STARTING - CSP DISABLED VERSION [FIXED]  ');
console.log('   If you do not see this, OLD CODE is running.    ');
console.log('---------------------------------------------------');

// Security Middleware
// Security Middleware - FIXED & SECURE
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://*.google.com", "https://*.gstatic.com", "https://*.googletagmanager.com", "https://*.google-analytics.com", "https://*.googleadservices.com", "https://*.googlesyndication.com", "https://*.doubleclick.net", "https://www.google.com", "https://googleads.g.doubleclick.net", "https://aistudiocdn.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com", "https://*.googletagmanager.com"],
            fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:", "https://res.cloudinary.com", "https://placehold.co"],
            connectSrc: ["'self'", "https:", "https://aistudiocdn.com"],
            frameSrc: ["'self'", "https:"],
            upgradeInsecureRequests: [], // Optional: prevents upgrading http to https if not needed locally
        },
    },
}));
app.use(cors({
    origin: [
        'https://pestcontrolnoida.in',
        'https://www.pestcontrolnoida.in',
        'http://localhost:5173',
        'http://localhost:5000'
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-api-key', 'Authorization'],
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Health Check
app.get('/api', (req, res) => {
    res.status(200).send('Backend API is running');
});

// Database Setup
// Database Setup
const POSTS_DB_PATH = path.join(__dirname, 'db', 'posts.json');
const initialPosts = [
    {
        "id": "1",
        "title": "Termite Control Noida: Protect Your Home from Silent Destroyers",
        "slug": "termite-control-near-me-noida",
        "category": "Termite Control",
        "excerpt": "Termites are *silent destroyers* that can weaken beams, doors, and furniture long before you notice visible damage.",
        "content": "<p>Estimated reading time: 10–12 minutes</p> <h2 id=\"h-key-takeaways\"><strong>Key Takeaways</strong></h2> <ul> <li>Termites are *silent destroyers* that can weaken beams, doors, and furniture long before you notice visible damage.</li> <li>Noida’s mix of high-rise apartments, plotted houses, and constant construction makes it highly vulnerable to termite attacks.</li> <li>Early detection and timely <strong>termite control in Noida</strong> can save you from massive repair bills and safety risks.</li> <li>Both <em>pre-construction</em> and <em>post-construction</em> treatments are essential for long-term protection and should be done by trained professionals.</li> <li>Choosing a licensed, experienced, and locally active termite service provider is critical for reliable, guaranteed results.</li> </ul> <div class=\"table-of-contents\"> <h2 id=\"h-table-of-contents\"><strong>Table of Contents</strong></h2> <ul> <li><a href=\"#h-termite-control-noida-protect-your-home-from-silent-destroyers\">Termite Control Noida: Protect Your Home from Silent Destroyers</a></li> <li><a href=\"#h-key-takeaways\">Key Takeaways</a></li> <li><a href=\"#h-why-termite-control-in-noida-cannot-be-ignored\">Why Termite Control in Noida Cannot Be Ignored</a></li> <li><a href=\"#h-signs-of-termite-infestation-in-noida-homes\">Signs of Termite Infestation in Noida Homes</a></li> <li><a href=\"#h-types-of-termites-found-in-noida\">Types of Termites Found in Noida</a></li> <li><a href=\"#h-pre-construction-termite-treatment-in-noida\">Pre-Construction Termite Treatment in Noida</a></li> <li><a href=\"#h-post-construction-termite-treatment-in-noida\">Post-Construction Termite Treatment in Noida</a></li> <li><a href=\"#h-diy-vs-professional-termite-control-in-noida\">DIY vs Professional Termite Control in Noida</a></li> <li><a href=\"#h-how-to-choose-the-right-termite-control-company-in-noida\">How to Choose the Right Termite Control Company in Noida</a></li> <li><a href=\"#h-preventive-tips-to-keep-your-property-termite-free\">Preventive Tips to Keep Your Property Termite-Free</a></li> <li><a href=\"#h-frequently-asked-questions\">Frequently Asked Questions</a></li> </ul> </div> <p>Imagine waking up one day to discover that your beautiful wooden wardrobe, door frames, or expensive modular kitchen has been hollowed out from the inside. No water leak, no visible warning – just fine powder, mud tubes, and weakened wood. That is how silently termites work.</p> <p>In a fast-growing city like Noida, where new projects come up every month and many homes still sit close to open plots, parks, and damp basements, termites find the perfect environment. That’s why timely, professional <a href=\"https://www.lexhygiene.com/why-termite-control-in-noida-is-essential-for-your-homes-safety/\"><strong>termite control in Noida</strong></a> is not a luxury – it’s protection for your biggest investment: your home.</p> <h2 id=\"h-why-termite-control-in-noida-cannot-be-ignored\"><strong>Why Termite Control in Noida Cannot Be Ignored</strong></h2> <p>Noida’s soil conditions, frequent construction activity, and underground cabling all encourage subterranean termite colonies. These termites travel through soil and tiny gaps, entering homes through foundations, wall cracks, and plumbing points. By the time you see damage, they may already have spread across multiple rooms or even neighbouring flats.</p> <p>Left untreated, termites can:</p> <ul> <li>Compromise structural wood such as beams, door frames, and flooring.</li> <li>Damage built-in furniture, wardrobes, and storage units.</li> <li>Eat into books, cardboard boxes, and important documents.</li> <li>Reduce property value and increase renovation costs.</li> </ul> <h2 id=\"h-signs-of-termite-infestation-in-noida-homes\"><strong>Signs of Termite Infestation in Noida Homes</strong></h2> <p>Because termites avoid light and work from the inside, early detection is tricky – but not impossible. Look out for:</p> <ul> <li>Thin mud tubes on walls, skirting, or near door frames.</li> <li>Wood that sounds hollow when tapped, or suddenly crumbles when pressed.</li> <li>Tight-fitting doors and windows that were previously smooth to operate.</li> <li>Piles of fine, sand-like particles (frass) near wooden fixtures.</li> <li>Winged termites (swarmers) around lights or windows during humid weather.</li> </ul> <p>If you notice even one of these signs, it’s time to call a specialist for detailed inspection and <a href=\"https://www.lexhygiene.com/termite-pest-control-effective-methods-to-protect-your-property/\"><strong>termite pest control in Noida</strong></a> rather than waiting for visible damage to grow.</p> <h2 id=\"h-types-of-termites-found-in-noida\"><strong>Types of Termites Found in Noida</strong></h2> <p>Most infestations in Noida are caused by subterranean termites that live in soil and build colonies underground. They travel through mud tubes into buildings in search of cellulose (wood, paper, fabric). In some older houses with poorly protected timber, drywood termites may also appear, nesting directly inside wooden items.</p> <p>Because different termite species behave differently, a good termite control company will always inspect and identify the type of termite before suggesting a treatment plan.</p> <h2 id=\"h-pre-construction-termite-treatment-in-noida\"><strong>Pre-Construction Termite Treatment in Noida</strong></h2> <p>For new buildings, pre-construction treatment is the most cost-effective way to stay protected from day one. During the early stages of construction, the soil under and around the foundation is treated with approved termiticide chemicals to form a continuous protective barrier.</p> <p>This process, often described as a <a href=\"https://lexhygiene.com/secure-investment-pre-construction-termite-treatment\"><strong>secure investment pre-construction termite treatment</strong></a>, helps prevent termites from entering the structure through the soil in future.</p> <ul> <li>Carried out before flooring and plinth work is completed.</li> <li>Provides long-term protection if not disturbed by later construction changes.</li> <li>Ideal for villas, plotted houses, and even builder projects in Noida and Greater Noida.</li> </ul> <h2 id=\"h-post-construction-termite-treatment-in-noida\"><strong>Post-Construction Termite Treatment in Noida</strong></h2> <p>Already living in a flat or house? Post-construction treatment is designed for existing buildings where termites have already entered or where you want preventive protection.</p> <p>Typical steps in a professional <strong>post-construction termite treatment in Noida</strong> include:</p> <ul> <li>Detailed inspection of all rooms, balconies, basements, and exterior areas.</li> <li>Drilling small holes along walls, skirting, and around pillars to inject termiticide into the soil below.</li> <li>Treating infested wood directly and sealing entry points.</li> <li>Creating a continuous chemical barrier around the structure.</li> </ul> <p>With the right chemicals, equipment, and follow-up visits, professional <a href=\"https://www.lexhygiene.com/termite-pest-control-effective-methods-to-protect-your-property/\"><strong>termite pest control</strong></a> can eliminate active colonies and protect you for years.</p> <h2 id=\"h-diy-vs-professional-termite-control-in-noida\"><strong>DIY vs Professional Termite Control in Noida</strong></h2> <p>Sprays, home remedies, and one-time surface treatments may kill a few visible termites, but they rarely touch the colony hidden deep in soil and walls. The result: termites disappear for a while and then come back stronger.</p> <p>Professional termite control has three big advantages:</p> <ul> <li>Access to industry-grade termiticides that actually reach and kill the colony.</li> <li>Trained technicians who know where to drill, inject, and monitor.</li> <li>Service warranties and follow-up checks to ensure long-term results.</li> </ul> <h2 id=\"h-how-to-choose-the-right-termite-control-company-in-noida\"><strong>How to Choose the Right Termite Control Company in Noida</strong></h2> <p>When you search for “termite control near me Noida,” don’t just pick the first name you see. Evaluate providers carefully:</p> <ul> <li><strong>Licensing and certification</strong> – Are they authorised to use professional termite chemicals?</li> <li><strong>Local experience</strong> – Do they work regularly in Noida and Greater Noida sectors similar to yours?</li> <li><strong>Inspection first</strong> – Do they insist on inspecting your property before quoting?</li> <li><strong>Clear warranty</strong> – Do they offer written guarantees and follow-up visits?</li> <li><strong>Transparent pricing</strong> – Is the quote easy to understand, with clear inclusions and exclusions?</li> </ul> <h2 id=\"h-preventive-tips-to-keep-your-property-termite-free\"><strong>Preventive Tips to Keep Your Property Termite-Free</strong></h2> <p>In addition to professional treatment, small lifestyle changes can reduce your risk:</p> <ul> <li>Fix plumbing leaks and damp patches quickly – termites love moisture.</li> <li>Avoid storing cardboard boxes, old newspapers, and wood directly on the floor.</li> <li>Keep soil and garden beds slightly away from external walls and plinth.</li> <li>Get annual inspections done, especially if neighbours in your society have had termite issues.</li> </ul> <h2 id=\"h-frequently-asked-questions\"><strong>Frequently Asked Questions</strong></h2> <ul> <li> <a href=\"#h-faq-q1\">How do I know if I really have termites in my Noida home?</a> </li> <li> <a href=\"#h-faq-q2\">Is termite treatment safe for children and pets?</a> </li> <li> <a href=\"#h-faq-q3\">How long does a termite treatment in Noida typically last?</a> </li> <li> <a href=\"#h-faq-q4\">What is the difference between pre-construction and post-construction termite treatment?</a> </li> <li> <a href=\"#h-faq-q5\">How soon should I call a professional after seeing termite signs?</a> </li> </ul> <h3 id=\"h-faq-q1\">How do I know if I really have termites in my Noida home?</h3> <p>Look for mud tubes, hollow-sounding wood, discarded wings, or fine powder near wooden fixtures. If you’re unsure, it’s wise to book a professional inspection – experts can confirm and map the infestation before suggesting treatment.</p> <h3 id=\"h-faq-q2\">Is termite treatment safe for children and pets?</h3> <p>When done by licensed professionals using approved chemicals, termite treatment is designed to be safe. Technicians will guide you on temporary precautions like staying out of treated rooms for a short time until everything is dry and ventilated.</p> <h3 id=\"h-faq-q3\">How long does a termite treatment in Noida typically last?</h3> <p>Effectiveness depends on the product used, construction type, and maintenance. Many professional treatments come with multi-year warranties, provided you follow recommended inspection and follow-up schedules.</p> <h3 id=\"h-faq-q4\">What is the difference between pre-construction and post-construction termite treatment?</h3> <p>Pre-construction treatment is done at the building stage by treating the soil before flooring and foundation are completed. Post-construction treatment is carried out in existing structures using drilling, injection, and targeted wood treatments.</p> <h3 id=\"h-faq-q5\">How soon should I call a professional after seeing termite signs?</h3> <p>Immediately. Termites do not stop on their own, and every month of delay can increase the damage. The sooner you arrange professional <strong>termite control in Noida</strong>, the easier and more economical it is to protect your home.</p>",
        "author": "Pest Control Noida Expert",
        "date": "2025-01-28",
        "imageUrl": "https://res.cloudinary.com/drvdyd23p/image/upload/v1765126836/a7e1343f-95bf-434c-9bb1-1bad3096f16a.png",
        "seoTitle": "Termite Control Noida: Protect Your Home from Silent Destroyers",
        "seoDescription": "Termites are *silent destroyers* that can weaken beams, doors, and furniture long before you notice visible damage.",
        "tags": ["Termite Control Near Noida"]
    },
    {
        "id": "2",
        "title": "Post-Construction Termite Treatment",
        "slug": "post-construction-termite-control",
        "category": "Termite Control",
        "excerpt": "Found termites in your walls? Our drill-fill-seal method stops them instantly. protect your woodwork today.",
        "content": "<p>If you notice mud tubes on walls or hollow-sounding wood in your Noida home or office, you might have a termite infestation. Our post-construction treatment is designed to eliminate existing colonies and prevent future attacks in the Delhi NCR region.</p><h3>Method</h3><p>We drill small holes at the skirting level of the walls and inject powerful anti-termite chemicals. These holes are then sealed with white cement, leaving no visible marks. We serve all sectors of Noida and surrounding Delhi NCR areas.</p>",
        "author": "Pest Control Noida Expert",
        "date": "2025-01-25",
        "imageUrl": "https://res.cloudinary.com/dzcxiamxp/image/upload/v1764138046/cld-sample-4.jpg",
        "seoDescription": "Post-construction termite treatment in Noida. Drill-fill-seal method. 5-year warranty.",
        "tags": ["Termite Control", "Drill-Fill-Seal", "5-Year Warranty"]
    },
    {
        "id": "3",
        "title": "Herbal Cockroach Control",
        "slug": "herbal-cockroach-control",
        "category": "Herbal",
        "excerpt": "Safe, odorless, and effective gel-based treatment for cockroaches. Perfect for kitchens and homes with pets in Delhi NCR.",
        "content": "<p>Cockroaches are a major health hazard. Our herbal gel treatment is applied in cracks and crevices where cockroaches hide. It attracts and kills them at the source.</p><h3>Benefits</h3><ul><li>Odorless and safe</li><li>No need to empty the kitchen</li><li>Long-lasting effect</li></ul>",
        "author": "Pest Control Noida Expert",
        "date": "2025-01-20",
        "imageUrl": "https://res.cloudinary.com/dzcxiamxp/image/upload/v1764138045/cld-sample-2.jpg",
        "seoDescription": "Herbal cockroach control in Noida. Odorless gel treatment safe for kitchens and pets.",
        "tags": ["Cockroach Control", "Herbal", "Odorless"]
    },
    {
        "id": "4",
        "title": "Bed Bug Treatment",
        "slug": "bed-bug-treatment",
        "category": "General Pest",
        "excerpt": "Sleep tight without the bites. Our intensive bed bug treatment eliminates bed bugs at all life stages.",
        "content": "<p>Bed bugs are notoriously difficult to get rid of. Our treatment involves a thorough inspection and spraying of infested areas, including mattresses, bed frames, and furniture.</p>",
        "author": "Pest Control Noida Expert",
        "date": "2025-01-15",
        "imageUrl": "https://res.cloudinary.com/dzcxiamxp/image/upload/v1764138039/samples/breakfast.jpg",
        "seoDescription": "Professional bed bug treatment in Noida. Complete elimination of bed bugs.",
        "tags": ["Bed Bugs", "Intensive Spray", "Pest Free"]
    },
    {
        "id": "5",
        "title": "Mosquito Fogging Services",
        "slug": "mosquito-fogging",
        "category": "General Pest",
        "excerpt": "Keep your outdoor areas safe from mosquitoes and vector-borne diseases like Dengue and Malaria in Delhi NCR.",
        "content": "<p>Our thermal fogging service is ideal for societies, parks, and large outdoor areas in Noida and Delhi. It effectively reduces the adult mosquito population.</p>",
        "author": "Pest Control Noida Expert",
        "date": "2025-01-10",
        "imageUrl": "https://res.cloudinary.com/dzcxiamxp/image/upload/v1764138030/samples/animals/three-dogs.jpg",
        "seoDescription": "Mosquito fogging services in Noida for societies and parks.",
        "tags": ["Mosquito Control", "Fogging", "Vector Control"]
    },
    {
        "id": "6",
        "title": "Wood Borer Treatment",
        "slug": "wood-borer-treatment",
        "category": "Termite Control",
        "excerpt": "Protect your expensive wooden furniture from wood-boring beetles. Specialized injection treatment available in Noida.",
        "content": "<p>Wood borers damage wooden furniture by creating tunnels inside. You might see fine wood dust around the furniture. We treat this by injecting chemicals directly into the exit holes. Available for homes and offices across Noida and Delhi NCR.</p>",
        "author": "Pest Control Noida Expert",
        "date": "2025-01-05",
        "imageUrl": "https://res.cloudinary.com/dzcxiamxp/image/upload/v1764138030/samples/people/jazz.jpg",
        "seoDescription": "Wood borer treatment for furniture in Noida. Protect your wood.",
        "tags": ["Wood Borer", "Furniture Protection", "Injection Treatment"]
    },
    {
        "id": "7",
        "title": "Commercial Pest Management",
        "slug": "commercial-pest-management",
        "category": "Commercial",
        "excerpt": "Tailored pest control solutions for offices, hotels, restaurants, and warehouses in Delhi NCR.",
        "content": "<p>Businesses in Noida and Delhi cannot afford pest infestations. We offer annual maintenance contracts (AMC) for commercial properties to ensure a pest-free environment year-round.</p>",
        "author": "Pest Control Noida Expert",
        "date": "2024-12-30",
        "imageUrl": "https://placehold.co/800x600?text=Commercial+Pest+Control",
        "seoDescription": "Commercial pest control services in Noida. AMC available for offices and hotels.",
        "tags": ["Commercial", "AMC", "Office"]
    },
    {
        "id": "8",
        "title": "Rodent Control Services",
        "slug": "rodent-control",
        "category": "General Pest",
        "excerpt": "Effective rat and mouse control using bait stations and trapping methods.",
        "content": "<p>Rodents can cause significant damage to property and wiring. Our strategic baiting and trapping solutions effectively control the rodent population.</p>",
        "author": "Pest Control Noida Expert",
        "date": "2024-12-25",
        "imageUrl": "https://placehold.co/800x600?text=Rodent+Control",
        "seoDescription": "Rodent control services in Noida. Rat and mouse trapping.",
        "tags": ["Rodent Control", "Baiting", "Trapping"]
    }
];

// Ensure DB directory exists
if (!fs.existsSync(path.join(__dirname, 'db'))) {
    fs.mkdirSync(path.join(__dirname, 'db'));
}

// Memory Cache for Posts
let postsCache = [];

// Initialize Cache from Disk (Once on Startup)
try {
    if (fs.existsSync(POSTS_DB_PATH)) {
        console.log('Loading posts from DB to memory...');
        const fileContent = fs.readFileSync(POSTS_DB_PATH, 'utf8');
        postsCache = JSON.parse(fileContent);
    } else {
        console.log('DB file not found. Seeding memory with initial data & creating file...');
        postsCache = initialPosts;
        fs.writeFileSync(POSTS_DB_PATH, JSON.stringify(initialPosts, null, 2));
    }
} catch (error) {
    console.error('Error initializing DB:', error);
    postsCache = initialPosts; // Fallback
}

// SMTP Configuration
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Verify SMTP Connection
transporter.verify(function (error, success) {
    if (error) {
        console.log('SMTP Connection Error:', error);
    } else {
        console.log('Server is ready to take our messages');
    }
});


// Authentication Middleware
const authenticate = (req, res, next) => {
    // Check for API Key in headers
    const apiKey = req.headers['x-api-key'];

    // In production, use process.env.ADMIN_API_KEY. 
    // Fallback for immediate relief if env is missing, but USER SHOULD UPDATE .env
    const validKey = process.env.ADMIN_API_KEY || 'aAFFknckan^%#653873dlhuADFSDF#@$@$sdfdsf';

    // Simplified logging to reduce I/O (removed detailed log for every hit)
    if (apiKey && apiKey === validKey) {
        next();
    } else {
        console.warn(`Unauthorized access attempt from ${req.ip}`);
        res.status(401).json({ error: 'Unauthorized: Invalid API Key' });
    }
};

// --------------------------
// API ROUTES (MUST BE FIRST)
// --------------------------

// GET All Posts (Served from Memory)
app.get('/api/posts', (req, res) => {
    // Serve directly from memory cache
    res.json(postsCache);
});

// POST (Save) Posts - PROTECTED (Updates Memory & Disk)
app.post('/api/posts', authenticate, (req, res) => {
    try {
        const posts = req.body;
        if (!Array.isArray(posts)) {
            return res.status(400).json({ error: 'Invalid data format. Expected an array of posts.' });
        }

        // 1. Update Memory Cache immediately
        postsCache = posts;

        // 2. Write to disk (Async to avoid blocking event loop)
        fs.writeFile(POSTS_DB_PATH, JSON.stringify(posts, null, 2), (err) => {
            if (err) {
                console.error('Error writing to posts DB file:', err);
                // Note: We don't fail the request here because memory is updated, 
                // but we log the error for admin attention.
            } else {
                console.log('DB file updated successfully.');
            }
        });

        res.json({ message: 'Posts saved successfully' });
    } catch (error) {
        console.error('Error handling post save:', error);
        res.status(500).json({ error: `Failed to save posts: ${error.message}` });
    }
});

// --------------------------
// SITEMAP ROUTE (Dynamic)
// --------------------------
// --------------------------
// SITEMAP ROUTE (Dynamic)
// --------------------------
app.get('/sitemap.xml', (req, res) => {
    try {
        // Use memory cache directly
        const posts = postsCache;

        const baseUrl = 'https://pestcontrolnoida.in';
        const currentDate = new Date().toISOString().split('T')[0];

        // Static Pages
        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
      <loc>${baseUrl}/</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
   </url>
   <url>
      <loc>${baseUrl}/blog</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>daily</changefreq>
      <priority>0.8</priority>
   </url>
   <url>
      <loc>${baseUrl}/about</loc>
      <lastmod>${currentDate}</lastmod>
      <priority>0.6</priority>
   </url>
   <url>
      <loc>${baseUrl}/contact</loc>
      <lastmod>${currentDate}</lastmod>
      <priority>0.7</priority>
   </url>
   <url>
      <loc>${baseUrl}/privacy</loc>
      <lastmod>${currentDate}</lastmod>
      <priority>0.5</priority>
   </url>
   <url>
      <loc>${baseUrl}/terms</loc>
      <lastmod>${currentDate}</lastmod>
      <priority>0.5</priority>
   </url>
   
   <!-- Categories -->
   <url>
      <loc>${baseUrl}/category/termite-control</loc>
      <lastmod>${currentDate}</lastmod>
      <priority>0.8</priority>
   </url>
   <url>
      <loc>${baseUrl}/category/general-pest</loc>
      <lastmod>${currentDate}</lastmod>
      <priority>0.8</priority>
   </url>
   <url>
      <loc>${baseUrl}/category/herbal</loc>
      <lastmod>${currentDate}</lastmod>
      <priority>0.8</priority>
   </url>`;

        // Dynamic Blog Posts
        posts.forEach(post => {
            xml += `
   <url>
      <loc>${baseUrl}/blog/${post.slug}</loc>
      <lastmod>${post.date || currentDate}</lastmod>
      <priority>0.7</priority>
   </url>`;
        });

        xml += `
</urlset>`;

        res.header('Content-Type', 'application/xml');
        res.send(xml);

    } catch (error) {
        console.error('Error generating sitemap:', error);
        res.status(500).send('Error generating sitemap');
    }
});

// Contact Form API
app.post('/api/contact', async (req, res) => {
    const { name, email, phone, service, message, token } = req.body;

    if (!name || !email || !phone || !token) {
        return res.status(400).json({ error: 'Please fill in all required fields.' });
    }

    // Verify reCAPTCHA Token
    try {
        const recaptchaResponse = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
        );

        const { success, score } = recaptchaResponse.data;

        if (!success || score < 0.5) {
            return res.status(400).json({ error: 'reCAPTCHA verification failed. Please try again.' });
        }
    } catch (error) {
        console.error('reCAPTCHA Error:', error);
        return res.status(500).json({ error: 'reCAPTCHA verification failed.' });
    }

    const mailOptions = {
        from: `"${name}" <${process.env.SMTP_USER}>`, // Sender address (must be authenticated user)
        to: 'info@pestcontrolnoida.in', // Receiver address
        replyTo: email,
        subject: `New Inquiry: ${service || 'General Inquiry'} from ${name}`,
        text: `
      Name: ${name}
      Email: ${email}
      Phone: ${phone}
      Service: ${service || 'Not specified'}
      
      Message:
      ${message || 'No message provided'}
    `,
        html: `
      <h3>New Inquiry Received</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Service:</strong> ${service || 'Not specified'}</p>
      <p><strong>Message:</strong></p>
      <p>${message || 'No message provided'}</p>
    `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Email Send Error:', error);
        res.status(500).json({ error: 'Failed to send email. Please try again later.' });
    }
});

// --------------------------
// STATIC FILES & CATCH-ALL (MUST BE LAST)
// --------------------------

// Serve static files from the React app
// 1. Aggressive caching for immutable assets (images/js/css with hashes)
// Vite puts js/css in an 'assets' folder with hashed filenames (e.g., index.a1b2c3d4.js)
app.use('/assets', express.static(path.join(__dirname, 'dist', 'assets'), {
    maxAge: '1y',     // Cache for 1 year
    immutable: true,  // Content never changes for a given filename
    etag: true
}));

// 2. Moderate caching for other static files (favicon, robots.txt, etc.) in root of dist
app.use(express.static(path.join(__dirname, 'dist'), {
    maxAge: '1d', // Cache for 1 day
    etag: true
}));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    // Basic caching for index.html (1 hour)
    // This balance ensures users get new updates (like new blog posts) within an hour
    // without hitting the server on every click.
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
