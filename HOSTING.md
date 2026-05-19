# Hosting Arcadyo.com on Namecheap (Shared Hosting)

To run this Node.js application on Namecheap shared hosting, follow these steps precisely:

## 1. Prepare the Application (On your computer)
1. **Build Everything**: In your terminal, run:
   ```bash
   npm run build:all
   ```
   This creates a `dist` folder containing both the frontend files and the `server.js` file.
2. **Compress Files**: Zip the following:
   - `dist/`
   - `package.json`
   - `package-lock.json`
   - `.env.example` (rename to `.env` later)

## 2. Setup Node.js App in cPanel
1. Log in to your **Namecheap cPanel**.
2. Search for **"Setup Node.js App"** and click it.
3. Click **"Create Application"**.
4. **Node.js version**: Select **20.x** or **18.x**.
5. **Application mode**: Set to `Production`.
6. **Application root**: Enter the directory where you will upload (e.g., `public_html/g-slosat.com`).
7. **Application URL**: Select your domain.
8. **Application startup file**: Enter `dist/server.js`. **(CRITICAL: Use the .js file in dist)**

## 3. Upload and Install
1. Open **File Manager** in cPanel.
2. Go to the `Application root` folder you specified.
3. Upload your zip file and **Extract** it.
4. Go back to the **"Setup Node.js App"** interface.
5. Click **"Run npm install"**.

## 4. Environment Variables
1. In the "Setup Node.js App" interface, add:
   - `NODE_ENV` = `production`
   - `PORT` = `3000` (Passenger will handle the actual routing)

## 5. Troubleshooting
- **404 Errors**: Ensure `dist/server.js` is set as the startup file.
- **503/500 Errors**: Check the "stderr" logs in the Node.js App interface.
- **Missing Files**: Ensure the `dist` folder was uploaded correctly and contains `index.html` and `server.js`.

## Why this works:
Namecheap shared hosting uses **Phusion Passenger** to run Node.js. Passenger requires a `.js` entry point. By running `npm run build:all`, we convert the TypeScript server into a standard JavaScript file that Namecheap understands.
