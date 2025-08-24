# Netlify Deployment Guide

This guide will walk you through deploying your course website to Netlify with subdomain redirects.

## Prerequisites
- Git repository initialized ✅
- Netlify account (free at netlify.com)
- GitHub account (to host your repository)

## Step 1: Push to GitHub

First, create a new repository on GitHub and push your code:

```bash
# Add GitHub as remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/courses.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Netlify

### Option A: Deploy via Netlify UI

1. Log in to [Netlify](https://app.netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Authorize Netlify to access your GitHub account
5. Select your `courses` repository
6. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18 (already configured in netlify.toml)
7. Click "Deploy site"

### Option B: Deploy via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and link to Netlify
netlify init

# Deploy to production
netlify deploy --prod
```

## Step 3: Configure Custom Domain

1. In Netlify dashboard, go to "Domain settings"
2. Add your custom domain (e.g., `neeldhara.com`)
3. Follow Netlify's DNS configuration instructions

## Step 4: Set Up Subdomains

The subdomain redirects are already configured in `netlify.toml`. To make them work:

### For Each Course Subdomain:

1. In your domain registrar (or Netlify DNS if you're using it):
   - Add CNAME records for each subdomain pointing to your main Netlify site
   
   Example DNS records:
   ```
   fun.neeldhara.com         CNAME    your-site-name.netlify.app
   mas.neeldhara.com         CNAME    your-site-name.netlify.app
   mfai.neeldhara.com        CNAME    your-site-name.netlify.app
   dm.neeldhara.com          CNAME    your-site-name.netlify.app
   dsa.neeldhara.com         CNAME    your-site-name.netlify.app
   fpt.neeldhara.com         CNAME    your-site-name.netlify.app
   cp.neeldhara.com          CNAME    your-site-name.netlify.app
   magic.neeldhara.com       CNAME    your-site-name.netlify.app
   advalgo.neeldhara.com     CNAME    your-site-name.netlify.app
   combinatorics.neeldhara.com CNAME  your-site-name.netlify.app
   linalg.neeldhara.com      CNAME    your-site-name.netlify.app
   comsoc.neeldhara.com      CNAME    your-site-name.netlify.app
   misc.neeldhara.com        CNAME    your-site-name.netlify.app
   ```

2. In Netlify's Domain settings:
   - Add each subdomain as a domain alias
   - Click "Add domain alias" for each subdomain

## Step 5: Enable HTTPS

1. In Netlify dashboard, go to "Domain settings" → "HTTPS"
2. Click "Verify DNS configuration"
3. Once verified, click "Provision certificate"
4. Wait for SSL certificate to be provisioned (usually takes a few minutes)

## How Subdomain Redirects Work

Once configured, the redirects in `netlify.toml` will:
- Redirect `fun.neeldhara.com` → `neeldhara.com/fun/`
- Redirect `mas.neeldhara.com` → `neeldhara.com/mas/`
- And so on for all course modules

Users can access courses via:
- Direct URLs: `neeldhara.com/fun/notes/01-binary-numbers`
- Subdomain URLs: `