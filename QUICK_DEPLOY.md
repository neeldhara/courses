# Quick Deploy to Netlify - Next Steps

Your repository is now successfully pushed to GitHub! 
Repository URL: https://github.com/neeldhara/courses

## Deploy to Netlify (2 minutes)

1. **Go to Netlify:**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Log in or sign up for free

2. **Import your project:**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Select the `neeldhara/courses` repository

3. **Deploy settings (already configured in netlify.toml):**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

## Configure Subdomains (5 minutes)

After deployment, in Netlify's Domain settings:

1. **Add your main domain:** `neeldhara.com`

2. **Add subdomain aliases:**
   - fun.neeldhara.com
   - mas.neeldhara.com
   - mfai.neeldhara.com
   - dm.neeldhara.com
   - dsa.neeldhara.com
   - fpt.neeldhara.com
   - cp.neeldhara.com
   - magic.neeldhara.com
   - advalgo.neeldhara.com
   - combinatorics.neeldhara.com
   - linalg.neeldhara.com
   - comsoc.neeldhara.com
   - misc.neeldhara.com

3. **Configure DNS:**
   - Point all subdomains to your Netlify site using CNAME records
   - Example: `fun.neeldhara.com CNAME your-site.netlify.app`

## Subdomain Redirects

The redirects are already configured in `netlify.toml`:
- `fun.neeldhara.com` → `neeldhara.com/fun/`
- `mas.neeldhara.com` → `neeldhara.com/mas/`
- And so on...

## SSL Certificate

Netlify will automatically provision SSL certificates for all domains once DNS is configured.

---

Your site will be live in about 2-3 minutes after deployment! 🚀