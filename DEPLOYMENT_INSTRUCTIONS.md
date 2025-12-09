# Deployment Guide: cPanel (Node.js App)

This update includes a **Server-Side Database**. It is critical to follow these steps to ensure your blog posts sync correctly across all devices.

## 1. Prepare
1.  Locate the file: `c:\Users\HP\Downloads\Antigravity Final Websites and Softwares\pest-control-noida\backend.zip` on your computer.

## 2. Upload to cPanel
1.  Log in to your **cPanel**.
2.  Open **File Manager**.
3.  Navigate to your application folder (usually `repositories/pestcontrolnoida` or `public_html`, depending on where you set up the Node.js app).
    *   *Tip: It's the folder containing your `app.js` or `index.js`.*
4.  **Upload** the `backend.zip` file to this folder.

## 3. Install the Update
1.  **Select** `backend.zip` in File Manager.
2.  Click **Extract** (Extract to the current directory).
    *   *Confirm "Yes" to overwrite existing files.*
3.  Ensure the new `db` folder is visible. This is your new database!

## 4. Restart Server
1.  Go back to the cPanel main dashboard.
2.  Click on **Setup Node.js App**.
3.  Find your application in the list.
4.  Click the **Restart** button.

## 5. Verify
1.  Open your website on your **Mobile Phone**.
    *   *Note: Clear your browser cache if you don't see changes immediately.*
2.  Go to the **Blog** page.
3.  Verify that the "Herbal" link works and dates are sorted with the newest first.
