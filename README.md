# KahaniKraftTales™ - AI Story Generator

A beautiful web application that generates multilingual stories using various AI language models. Create amazing stories in English, Hindi, and Hinglish with the power of AI magic! ✨

<!-- Deployment test with API keys configured -->

## 🌟 Features

- **Multi-Language Support**: Generate stories in English, Hindi, and Hinglish
- **Multiple AI Models**: Support for OpenAI ChatGPT, Google Gemini, and Anthropic Claude
- **🔐 Secure API Key Management**: Safe handling of API keys across all platforms
- **Beautiful UI**: Modern glassmorphism design with responsive layout
- **Demo Mode**: Try the app without API keys using pre-written demo stories
- **Typewriter Effect**: Engaging story display with smooth animations
- **Platform Agnostic**: Deploy to GitHub Pages, Netlify, Vercel, or any static hosting

## 🚀 Live Demo

**GitHub Pages**: [https://roottraveller.github.io/KahaniKraftTales-KKT/](https://roottraveller.github.io/KahaniKraftTales-KKT/)

*Note: The live demo works in demo mode. To use real AI models, you'll need to add your own API keys.*

📖 **Read our [Security Guide](SECURITY.md)** for complete API key setup instructions.

## 📦 Deployment Options

### 🔧 Platform-Agnostic Build

This project is designed to work on multiple deployment platforms:

```bash
# Build for any static hosting platform
npm run build

# Platform-specific commands
npm run deploy:netlify    # Netlify deployment
npm run deploy:vercel     # Vercel deployment
npm run deploy            # GitHub Pages deployment
```

### 🌐 GitHub Pages (Recommended - Most Secure)
- **Auto-deployment**: Pushes to `main` branch automatically deploy
- **Secure API keys**: Uses GitHub Secrets for safe key management
- **Custom domain**: Configurable in repository settings
- **Branch**: Uses GitHub Actions for deployment

**Setup:**
1. Fork/clone this repository
2. Go to GitHub.com Settings → Secrets and variables → Actions
3. Add your API keys as secrets (optional):
   ```
   OPENAI_API_KEY=your_key_here
   GEMINI_API_KEY=your_key_here
   ANTHROPIC_API_KEY=your_key_here
   ```
4. Enable GitHub Pages with "GitHub Actions" source
5. Push to main branch

### 🔥 Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build:static`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard for API keys

### ⚡ Vercel
1. Import your repository to Vercel
2. Set build command: `npm run build:static`
3. Set output directory: `dist`
4. Add environment variables in Vercel dashboard for API keys

## 🛠️ Local Development

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/roottraveller/KahaniKraftTales-KKT.git
   cd KahaniKraftTales-KKT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup (Optional)**
   ```bash
   cp env.example .env
   # Edit .env with your API keys (never commit this file!)
   ```

4. **Run locally**
   ```bash
   # Development server with hot reload
   npm run dev

   # Production server
   npm start

   # Static build for deployment
   npm run build

   # Preview static build
   npm run preview
   ```

## 🔑 API Configuration

### For Local Development

Create a `.env` file with your API keys:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Google Gemini Configuration  
GEMINI_API_KEY=your_gemini_api_key_here

# Anthropic Claude Configuration
ANTHROPIC_API_KEY=your_anthropic_api_key_here

# Server Configuration
PORT=3000
```

### For Deployment

**Never put API keys in your code!** Instead:

- **GitHub Pages**: Use GitHub Secrets
- **Netlify**: Use Netlify environment variables
- **Vercel**: Use Vercel environment variables
- **Other platforms**: Use their respective secret management

📖 **See [Security Guide](SECURITY.md)** for detailed setup instructions.

## 📁 Project Structure

```
KahaniKraftTales-KKT/
├── public/                 # Static assets and client-side code
│   ├── css/               # Stylesheets
│   ├── js/                # JavaScript modules
│   └── index.html         # Main HTML file
├── scripts/               # Build and deployment scripts
├── data/                  # Demo stories and data files
├── .github/workflows/     # GitHub Actions
├── server.js              # Node.js server (for local development)
├── package.json           # Dependencies and scripts
├── SECURITY.md            # Security guide for API keys
├── DEPLOYMENT.md          # Deployment guide
└── README.md             # This file
```

**Try the Demo**: Visit `http://localhost:3000/demo-effects.html` to test all effects individually!

## 🛠️ **Development**

### Component Architecture

The application follows a modular, component-based architecture:

- **StoryApp.js**: Main application class handling state and logic
- **UIManager.js**: Static utility class for UI operations
- **Component CSS**: Separate stylesheets for each UI component

### Security Features

- **Build-time API key injection**: Keys are injected during build, not stored in client code
- **Runtime model detection**: Automatically detects and disables unavailable models
- **Graceful error handling**: Secure error messages without exposing sensitive information
- **CORS-aware**: Handles different API requirements and limitations

## 🔍 Troubleshooting

### Common Issues

1. **Models showing "API Key Required"**: This is normal if API keys aren't configured
2. **Demo mode only**: The app works perfectly in demo mode without any API keys
3. **Build failures**: Check Node.js version (requires >=14.0.0)
4. **CORS errors**: Some APIs require server-side implementation

### Getting Help

- 📖 **Deployment Issues**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- 🔐 **Security Questions**: See [SECURITY.md](SECURITY.md)
- 🐛 **Bug Reports**: Open an issue on GitHub
- 💡 **Feature Requests**: Open an issue with the "enhancement" label

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly (including security aspects)
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Made with ❤️ by rimaurya** | **Powered by AI Magic** ✨ 