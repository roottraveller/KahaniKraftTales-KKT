# 🚀 Deployment Guide

This guide covers all deployment options for KahaniKraftTales, from automated GitHub Actions to manual deployments.

## 📋 Overview

We support multiple deployment platforms with optimized builds for each:

- **GitHub Pages** - Automated deployment with GitHub Actions
- **Netlify** - Drag & drop or Git integration
- **Vercel** - Git integration or CLI deployment
- **Generic Static Hosting** - Any static hosting provider

## 🔐 Security First

**Important**: Before deploying, read our [Security Guide](SECURITY.md) to learn how to safely manage API keys.

### Quick Security Setup:
1. **Never commit API keys** to your repository
2. **Use platform secrets** for secure key storage
3. **App works without keys** in demo mode
4. **Keys are injected at build time** securely

## 🤖 Automated Deployments (Recommended)

### GitHub Pages (Fully Automated + Secure)

**Setup:**
1. Go to your repository settings → Pages
2. Set source to "GitHub Actions"
3. **Optional**: Add API keys to GitHub Secrets (Settings → Secrets and variables → Actions):
   ```
   OPENAI_API_KEY=your_openai_key_here
   GEMINI_API_KEY=your_gemini_key_here
   ANTHROPIC_API_KEY=your_anthropic_key_here
   ```
4. Push to `main` branch

**What happens:**
- Automatically builds and deploys on every push to `main`
- Uses the `deploy-github-pages.yml` workflow
- Handles base path configuration automatically
- **Securely injects API keys** from GitHub Secrets
- Available at: `https://roottraveller.github.io/KahaniKraftTales-KKT`

**Security Features:**
- ✅ API keys never appear in code or logs
- ✅ Keys are injected at build time only
- ✅ App works in demo mode without keys
- ✅ Automatic model availability detection

### Build Artifacts for Other Platforms

The `build.yml` workflow creates optimized builds for all platforms:

```bash
# Triggered automatically on:
# - Push to main/develop
# - Pull requests to main
# - Manual workflow dispatch
```

**Artifacts generated:**
- `static-build-github-pages` - For GitHub Pages (with secure API key injection)
- `static-build-netlify` - For Netlify (configure env vars in dashboard)
- `static-build-vercel` - For Vercel (configure env vars in dashboard)
- `static-build-generic` - For any static hosting (demo mode only)

## 🛠️ Manual Deployments

### Prerequisites

```bash
npm install
```

### GitHub Pages

```bash
# Build and deploy to gh-pages branch (legacy method)
npm run deploy:github

# Or build only
npm run build:github-pages
```

**Note**: The automated GitHub Actions method is more secure and recommended.

### Netlify

```bash
# Build for Netlify
npm run build:netlify

# Then drag & drop the dist/ folder to Netlify
# Or connect your Git repository to Netlify
```

**Security Setup:**
1. Deploy your site first
2. Go to Netlify Dashboard → Site settings → Environment variables
3. Add your API keys:
   ```
   OPENAI_API_KEY=your_openai_key_here
   GEMINI_API_KEY=your_gemini_key_here
   ANTHROPIC_API_KEY=your_anthropic_key_here
   ```
4. Redeploy to apply the environment variables

### Vercel

```bash
# Build for Vercel
npm run build:vercel

# Then use Vercel CLI or connect Git repository
npx vercel --prod
```

**Security Setup:**
1. Deploy your site first
2. Go to Vercel Dashboard → Project → Settings → Environment Variables
3. Add your API keys:
   ```
   OPENAI_API_KEY=your_openai_key_here
   GEMINI_API_KEY=your_gemini_key_here
   ANTHROPIC_API_KEY=your_anthropic_key_here
   ```
4. Redeploy to apply the environment variables

### Generic Static Hosting

```bash
# Build for any static hosting (demo mode only)
npm run build:static

# Upload the dist/ folder to your hosting provider
```

**Note**: Generic builds don't include API key support for security reasons. The app will work in demo mode.

## 🔧 Platform-Specific Configurations

### GitHub Pages
- **Base Path:** `/KahaniKraftTales-KKT`
- **Asset URLs:** Automatically prefixed with base path
- **Demo Data:** Loads from `{basePath}/data/demo-stories.json`
- **API Keys:** Injected securely from GitHub Secrets
- **Security:** ✅ Highest security with automated key injection

### Netlify/Vercel
- **Base Path:** `/` (root)
- **Asset URLs:** Relative paths
- **Demo Data:** Loads from `./data/demo-stories.json`
- **API Keys:** Set via platform environment variables
- **Security:** ✅ Secure via platform secret management

### Generic
- **Base Path:** `/` (root)
- **Asset URLs:** Relative paths
- **Demo Data:** Loads from `./data/demo-stories.json`
- **API Keys:** Not supported (demo mode only)
- **Security:** ✅ No API keys = no security risk

## 📁 Build Output Structure

```
dist/
├── index.html              # Main HTML file
├── css/                    # Stylesheets
├── js/
│   └── static-app.js      # Bundled JavaScript (with secure API handling)
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

**For local development with API keys:**
```bash
# Copy environment template
cp env.example .env

# Edit .env with your API keys (never commit this file!)
# Then run:
npm run dev
```

## 🔍 Troubleshooting

### GitHub Pages Issues

1. **404 on assets:** Check if base path is correctly configured
2. **Workflow fails:** Ensure GitHub Pages is enabled in repository settings
3. **Old content:** Clear browser cache or check if deployment completed
4. **API keys not working:** Check GitHub Secrets are properly set

### API Key Issues

1. **Models disabled:** Check if API keys are properly configured
2. **"API Key Required" message:** Add keys to your platform's secret management
3. **Demo mode only:** This is normal if no API keys are configured
4. **CORS errors:** Some APIs (like Anthropic) require server-side implementation

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
# For GitHub Pages (most secure)
npm run deploy:github

# For Netlify
npm run deploy:netlify

# For Vercel  
npm run deploy:vercel

# For local testing
npm run preview

# For local development with API keys
npm run dev
```

## 📊 Workflow Status

Check the status of your deployments:

- **Build Status:** [GitHub Actions](../../actions/workflows/build.yml)
- **GitHub Pages:** [Deployment Status](../../actions/workflows/deploy-github-pages.yml)

## 🔗 Live Deployments

- **GitHub Pages:** https://roottraveller.github.io/KahaniKraftTales-KKT
- **Netlify:** Configure in your Netlify dashboard
- **Vercel:** Configure in your Vercel dashboard

## 🔐 Security Resources

- **Security Guide:** [SECURITY.md](SECURITY.md) - Complete API key security guide
- **GitHub Secrets:** [How to add secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- **Netlify Env Vars:** [Environment variables](https://docs.netlify.com/environment-variables/overview/)
- **Vercel Env Vars:** [Environment variables](https://vercel.com/docs/projects/environment-variables)

---

💡 **Tip**: The GitHub Actions approach with GitHub Secrets provides the most secure and automated deployment experience. The app works perfectly in demo mode without any API keys! 