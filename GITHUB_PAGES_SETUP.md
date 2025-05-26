# GitHub Pages Deployment Guide

This guide will help you deploy your KahaniKraftTales application to GitHub Pages.

## 🚀 Quick Setup

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: `https://github.com/roottraveller/KahaniKraftTales-KKT`
2. Click on **Settings** tab
3. Scroll down to **Pages** section in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The deployment will automatically trigger when you push to the main branch

### 2. Access Your Live Site

Once deployed, your site will be available at:
```
https://roottraveller.github.io/KahaniKraftTales-KKT/
```

## 📁 File Structure for GitHub Pages

The repository includes two versions:

### Static Demo Version (GitHub Pages)
- **Entry Point**: `index.html` (root level)
- **JavaScript**: `public/js/static-demo.js`
- **Features**: Demo stories only, no backend required
- **Perfect for**: GitHub Pages hosting

### Full Version (Local Development)
- **Entry Point**: `public/index.html`
- **JavaScript**: `public/js/components/StoryApp.js`
- **Features**: Real AI integration with OpenAI, Gemini, Claude
- **Perfect for**: Local development with Node.js server

## 🔧 Customization

### Adding More Demo Stories

Edit `public/js/static-demo.js` and add stories to the `demoStories` object:

```javascript
this.demoStories = {
    english: [
        {
            id: Date.now() + 1,
            prompt: "Your prompt here",
            story: "Your story content here...",
            language: "english",
            model: "demo",
            timestamp: new Date().toISOString(),
            isApiFallback: false
        }
        // Add more stories...
    ],
    // Add other languages...
};
```

### Styling Changes

Modify the CSS files in `public/css/` to customize the appearance:
- `public/css/main.css` - Main styles
- `public/css/components/` - Component-specific styles

## 🔄 Automatic Deployment

The repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that:

1. **Triggers** on every push to the main branch
2. **Builds** the static site
3. **Deploys** to GitHub Pages automatically
4. **Updates** your live site within minutes

## 🌐 Domain Configuration (Optional)

To use a custom domain:

1. Add a `CNAME` file to the root directory with your domain name
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings to use your custom domain

## 📱 Mobile Optimization

The site is fully responsive and optimized for:
- ✅ Desktop computers
- ✅ Tablets
- ✅ Mobile phones
- ✅ Touch interactions

## 🎨 Features in Demo Version

- ✨ Typewriter animation effects
- 🎯 Multi-language support (English, Hindi, Hinglish)
- 📱 Responsive design
- 💾 Local storage for story history
- 🎪 Beautiful glassmorphism UI
- ⚡ Fast loading times

## 🔗 Links

- **Live Demo**: https://roottraveller.github.io/KahaniKraftTales-KKT/
- **Repository**: https://github.com/roottraveller/KahaniKraftTales-KKT
- **Issues**: https://github.com/roottraveller/KahaniKraftTales-KKT/issues

## 📞 Support

If you encounter any issues with the GitHub Pages deployment:

1. Check the **Actions** tab for deployment status
2. Ensure GitHub Pages is enabled in repository settings
3. Verify the source is set to "GitHub Actions"
4. Check browser console for any JavaScript errors

---

**Note**: The GitHub Pages version is a static demo. For the full AI-powered experience with real language models, run the application locally with Node.js. 