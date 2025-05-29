# KahaniKraftTales™ - AI Story Generator

A beautiful web application that generates multilingual stories using various AI language models. Create amazing stories in English, Hindi, and Hinglish with the power of AI magic! ✨

## 🌟 Features

- **Multi-Language Support**: Generate stories in English, Hindi, and Hinglish
- **Multiple AI Models**: Support for OpenAI ChatGPT, Google Gemini, and Anthropic Claude
- **Beautiful UI**: Modern glassmorphism design with responsive layout
- **Demo Mode**: Try the app without API keys using pre-written demo stories
- **Typewriter Effect**: Engaging story display with smooth animations
- **Platform Agnostic**: Deploy to GitHub Pages, Netlify, Vercel, or any static hosting

## 🚀 Live Demo

**GitHub Pages**: [https://roottraveller.github.io/KahaniKraftTales-KKT/](https://roottraveller.github.io/KahaniKraftTales-KKT/)

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

### 🌐 GitHub Pages
- **Auto-deployment**: Pushes to `main` branch automatically deploy
- **Custom domain**: Configurable in repository settings
- **Branch**: Uses GitHub Actions for deployment

### 🔥 Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build:static`
3. Set publish directory: `dist`

### ⚡ Vercel
1. Import your repository to Vercel
2. Set build command: `npm run build:static`
3. Set output directory: `dist`

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

3. **Environment Setup**
   ```bash
   cp env.example .env
   # Edit .env with your API keys
   ```

4. **Run locally**
   ```bash
   # Development server with hot reload
   npm run dev

   # Production server
   npm start

   # Static build for deployment
   npm run build
   ```

## 🔑 API Configuration

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
└── README.md             # This file
```

**Try the Demo**: Visit `http://localhost:3000/demo-effects.html` to test all effects individually!
## 🎨 Customization

### Adding Demo Stories
Edit `data/demo-stories.json`:

```json
{
  "english": ["Your English story here..."],
  "hindi": ["आपकी हिंदी कहानी यहाँ..."],
  "hinglish": ["Aapki Hinglish story yahan..."]
}
```

## 🛠️ **Development**

### Component Architecture

The application follows a modular, component-based architecture:

- **StoryApp.js**: Main application class handling state and logic
- **UIManager.js**: Static utility class for UI operations
- **Component CSS**: Separate stylesheets for each UI component
- **Horizontal Separators**: Visual separation between sections

### Adding New Features

1. **New UI Components**: Add CSS files in `public/css/components/`
2. **New Functionality**: Extend the `StoryApp` class or create new components
3. **API Endpoints**: Add routes in `server.js`

## 🤝 **Contributing**
### Styling
Modify CSS files in `public/css/`:
- `main.css` - Main styles
- `components/` - Component-specific styles

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **AI Models**: OpenAI, Google, Anthropic for their amazing language models
- **Icons**: Font Awesome for beautiful icons
- **Fonts**: Google Fonts for typography
- **Design**: Glassmorphism design inspiration

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/roottraveller/KahaniKraftTales-KKT/issues)
- **Discussions**: [GitHub Discussions](https://github.com/roottraveller/KahaniKraftTales-KKT/discussions)

---

**Enjoy crafting amazing stories with KahaniKraftTales!** ✨ 

**Made with ❤️ by rimaurya** | **Powered by AI Magic** ✨ 