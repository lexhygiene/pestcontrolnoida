# Security Improvements & Best Practices

Now that your site is live, keeping it secure is critical. Here is a prioritized list of security improvements, ranging from **Urgent** to **Best Practice**.

---

## 🚨 URGENT: Secure the Admin API

**The Risk:**
Currently, your Admin Panel has a "login" screen, but it only checks the password on the *browser*. The *server* (where the data lives) accepts any request to save blog posts.
*   **Scenario:** A hacker finds your `/api/posts` URL and sends a "Delete All" command using a tool like Postman. The server would accept it.

**The Fix (API Key Protection):**
You should require a secret key for every save operation.

1.  **Add a Secret to `.env`:**
    ```env
    ADMIN_API_KEY=YourSuperSecretComplexPassword123!
    ```

2.  **Update `server/index.js`:**
    Add a middleware check before the `app.post('/api/posts')` line:

    ```javascript
    const authenticate = (req, res, next) => {
        const apiKey = req.headers['x-api-key'];
        if (apiKey && apiKey === process.env.ADMIN_API_KEY) {
            next();
        } else {
            res.status(401).json({ error: 'Unauthorized' });
        }
    };

    // Protect the Save Route
    app.post('/api/posts', authenticate, (req, res) => { ... });
    ```

3.  **Update `pages/AdminDashboard.tsx`:**
    Change the `fetch` call to include this header:

    ```javascript
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'YourSuperSecretComplexPassword123!' // Ideally from an env variable in real apps
    },
    ```

---

## 🛡️ Essential Security Improvements

### 1. Enable HTTPS (SSL)
*   **What it is:** The padlock icon in the browser address bar. It encrypts data (like passwords) between the user and the server.
*   **Action:** In cPanel, go to "SSL/TLS Status" and ensure AutoSSL is running. **Never** log in to your admin panel over HTTP (insecure).

### 2. Form Input Sanitization
*   **The Risk:** "Cross-Site Scripting" (XSS). A user types `<script>alert('Hacked')</script>` into your contact form. If you display this message on a private admin page, that script runs on your computer.
*   **Action:** Your server currently sends emails, which is generally safe as email clients block scripts. However, if you ever display user messages on the website (like comments), you **must** use a library like `dompurify` to clean the text first.

### 3. Rate Limiting (Already Added ✅)
*   We already added `express-rate-limit` to your server. This prevents attackers from trying to guess your password thousands of times a second or crashing your server with too many requests.

---

## 🛠️ Maintenance & Backups

### 1. Database Backups
*   **The Risk:** Since your database is a single file (`server/db/posts.json`), if that file gets corrupted or deleted, you lose everything.
*   **Action:**
    *   **Manual:** Once a week, use cPanel File Manager to download a copy of `server/db/posts.json` to your laptop.
    *   **Automated:** Ask your hosting provider if they have daily automated backups.

### 2. NPM Audits
*   **The Risk:** The code libraries you use (like `express` or `nodemailer`) might have bugs discovered in the future.
*   **Action:** Every month, run `npm audit` in your local project terminal. exact steps:
    1.  Open terminal in `server` folder.
    2.  Run `npm audit`.
    3.  If it reports "High" vulnerabilities, run `npm audit fix` and redeploy.

### 3. Hide Error Messages
*   **The Risk:** Detailed error messages (like we saw earlier with "Syntax Error at line 218") give hackers hints about your code structure.
*   **Action:** In your `server/index.js`, ensure you don't send `error.stack` to the client in production. (Your current code sends generic messages like "Failed to save posts", which is good).

---

## 📝 Summary Checklist

- [ ] **Setup API Key Authentication** (Priority #1)
- [ ] Verify HTTPS is active on cPanel.
- [ ] Download a backup of `posts.json`.
- [ ] Run `npm audit` locally to check for library updates.
