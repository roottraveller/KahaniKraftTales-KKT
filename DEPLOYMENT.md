# 🚀 Deployment Guide

This guide covers all deployment options for KahaniKraftTales, from automated GitHub Actions to manual deployments.

## 📋 Overview

We support multiple deployment platforms with optimized builds for each:

- **GitHub Pages** - Automated deployment with GitHub Actions
- **Netlify** - Drag & drop or Git integration
- **Vercel** - Git integration or CLI deployment
- **Generic Static Hosting** - Any static hosting provider

## 🤖 Automated Deployments (Recommended)

### GitHub Pages (Fully Automated)

**Setup:**
1. Go to your repository settings → Pages
2. Set source to "GitHub Actions"
3. Push to `main` branch

**What happens:**
- Automatically builds and deploys on every push to `main`
- Uses the `deploy-github-pages.yml` workflow
- Handles base path configuration automatically
- Available at: `https://roottraveller.github.io/KahaniKraftTales-KKT`

### Build Artifacts for Other Platforms

The `build.yml` workflow creates optimized builds for all platforms:

```bash
# Triggered automatically on:
# - Push to main/develop
# - Pull requests to main
# - Manual workflow dispatch
```

**Artifacts generated:**
- `static-build-github-pages` - For GitHub Pages
- `static-build-netlify` - For Netlify
- `static-build-vercel` - For Vercel  
- `static-build-generic` - For any static hosting

## 🛠️ Manual Deployments

### Prerequisites

```bash
npm install
```

### GitHub Pages

```bash
# Build and deploy to gh-pages branch
npm run deploy:github

# Or build only
npm run build:github-pages
```

### Netlify

```bash
# Build for Netlify
npm run build:netlify

# Then drag & drop the dist/ folder to Netlify
# Or connect your Git repository to Netlify
```

### Vercel

```bash
# Build for Vercel
npm run build:vercel

# Then use Vercel CLI or connect Git repository
npx vercel --prod
```

### Generic Static Hosting

```bash
# Build for any static hosting
npm run build:static

# Upload the dist/ folder to your hosting provider
```

## 🔧 Platform-Specific Configurations

### GitHub Pages
- **Base Path:** `/KahaniKraftTales-KKT`
- **Asset URLs:** Automatically prefixed with base path
- **Demo Data:** Loads from `{basePath}/data/demo-stories.json`

### Netlify/Vercel/Generic
- **Base Path:** `/` (root)
- **Asset URLs:** Relative paths
- **Demo Data:** Loads from `./data/demo-stories.json`

## 📁 Build Output Structure

```
dist/
├── index.html              # Main HTML file
├── css/                    # Stylesheets
├── js/
│   └── static-app.js      # Bundled JavaScript
├── data/
│   └── demo-stories.json  # Demo story data
├── assets/                # Static assets
└── deployment-info.json   # Build metadata
```

## 🧪 Local Testing

```bash
# Build and preview locally
npm run preview

# Then visit http://localhost:8000
```

## 🔍 Troubleshooting

### GitHub Pages Issues

1. **404 on assets:** Check if base path is correctly configured
2. **Workflow fails:** Ensure GitHub Pages is enabled in repository settings
3. **Old content:** Clear browser cache or check if deployment completed

### General Issues

1. **Build fails:** Check Node.js version (requires >=14.0.0)
2. **Missing dependencies:** Run `npm ci` to install exact versions
3. **Path issues:** Check `deployment-info.json` for build configuration

### Clean Build

```bash
# Clean previous builds
npm run clean

# Then rebuild
npm run build:static
```

## 🚀 Quick Start Commands

```bash
# For GitHub Pages
npm run deploy:github

# For Netlify
npm run deploy:netlify

# For Vercel  
npm run deploy:vercel

# For local testing
npm run preview
```

## 📊 Workflow Status

Check the status of your deployments:

- **Build Status:** [GitHub Actions](../../actions/workflows/build.yml)
- **GitHub Pages:** [Deployment Status](../../actions/workflows/deploy-github-pages.yml)

## 🔗 Live Deployments

- **GitHub Pages:** https://roottraveller.github.io/KahaniKraftTales-KKT
- **Netlify:** Configure in your Netlify dashboard
- **Vercel:** Configure in your Vercel dashboard

---

💡 **Tip:** The GitHub Actions approach is recommended as it provides the most reliable and automated deployment experience. 