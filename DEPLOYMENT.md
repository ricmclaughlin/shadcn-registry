# GitHub Pages Deployment Guide

This guide will help you deploy your shadcn-svelte theme registry to GitHub Pages with automatic deployment on every push.

## 🚀 **Quick Setup**

### 1. **Push to GitHub**
```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit: shadcn-svelte theme registry"

# Add your GitHub repository as origin
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY_NAME.git
git branch -M main
git push -u origin main
```

### 2. **Enable GitHub Pages**
1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 3. **Configure Repository Name (if needed)**
If your repository is NOT named exactly like your GitHub username (e.g., `username.github.io`), you need to update the base path:

**Option A: Update the GitHub Actions workflow**
Edit `.github/workflows/deploy.yml` and change:
```yaml
env:
  BASE_PATH: '/${{ github.event.repository.name }}'
```
to:
```yaml
env:
  BASE_PATH: '/your-actual-repository-name'
```

**Option B: Set repository name in package.json**
Update the `build:gh-pages` script in `package.json`:
```json
"build:gh-pages": "BASE_PATH=/your-repository-name npm run build"
```

## 🔧 **Configuration Details**

### **Files Added/Modified for GitHub Pages:**

1. **`.github/workflows/deploy.yml`** - Automatic deployment workflow
2. **`svelte.config.js`** - Updated to use static adapter
3. **`static/.nojekyll`** - Prevents Jekyll processing
4. **`package.json`** - Added GitHub Pages build script

### **How It Works:**

1. **Push to main branch** → Triggers GitHub Actions
2. **Build process** → Runs `npm run registry:build` then `npm run build`
3. **Deploy** → Uploads build artifacts to GitHub Pages
4. **Live site** → Available at `https://username.github.io/repository-name`

## 📝 **Usage After Deployment**

Once deployed, users can install your themes using:

```bash
# Replace with your actual GitHub Pages URL
npx shadcn-svelte@latest add https://username.github.io/repository-name/api/r/material-theme
npx shadcn-svelte@latest add https://username.github.io/repository-name/api/r/twitter-theme
npx shadcn-svelte@latest add https://username.github.io/repository-name/api/r/catppuccin-theme
```

## 🔄 **Development Workflow**

### **Adding New Themes:**

1. **Create theme file:**
   ```bash
   # Use the import script for TweakCN themes
   node scripts/import-tweakcn-theme.js doom-64
   
   # Or create manually in src/lib/registry/themes/
   ```

2. **Update registry:**
   - Add to `src/lib/registry.json`
   - Update `src/routes/api/r/[item]/+server.ts`
   - Add to homepage theme selector
   - Add CSS variables for preview

3. **Test locally:**
   ```bash
   npm run dev
   ```

4. **Deploy:**
   ```bash
   git add .
   git commit -m "feat: add doom-64 theme"
   git push origin main
   ```

5. **Automatic deployment** happens via GitHub Actions!

### **Local Testing with GitHub Pages Path:**

To test how your site will look on GitHub Pages locally:

```bash
# Test with the same base path as GitHub Pages
BASE_PATH=/your-repository-name npm run build
npm run preview
```

## 🛠️ **Troubleshooting**

### **Common Issues:**

1. **404 errors on GitHub Pages:**
   - Check that `BASE_PATH` is set correctly
   - Ensure `.nojekyll` file exists in `static/` folder

2. **CSS/JS not loading:**
   - Verify the base path configuration in `svelte.config.js`
   - Check browser developer tools for 404s

3. **API endpoints not working:**
   - GitHub Pages serves static files only
   - API routes are pre-rendered during build

4. **Build fails in GitHub Actions:**
   - Check the Actions tab in your repository
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

### **Manual Build Test:**

```bash
# Test the exact build process used by GitHub Actions
npm ci
npm run registry:build
BASE_PATH=/your-repository-name npm run build
```

## 🎯 **Benefits of This Setup**

✅ **Automatic Deployment** - Push changes and they're live in minutes
✅ **Free Hosting** - GitHub Pages is free for public repositories  
✅ **Custom Domain Support** - Can add your own domain later
✅ **SSL Certificate** - Automatic HTTPS
✅ **CDN** - Fast global delivery
✅ **Version Control** - Full git history of your themes

## 🔗 **Next Steps**

1. **Custom Domain** (optional):
   - Add `CNAME` file to `static/` folder
   - Configure DNS settings
   - Update GitHub Pages settings

2. **Theme Validation**:
   - Add automated testing for theme files
   - Validate color contrast ratios
   - Check accessibility compliance

3. **Analytics**:
   - Add Google Analytics or similar
   - Track theme usage and popularity

Your registry is now ready for production use! 🎉
