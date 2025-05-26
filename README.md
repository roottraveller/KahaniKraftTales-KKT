# 🎭 KahaniKraftTales - AI Story Generator

A beautiful, modern web application that generates creative stories using AI in multiple languages (English, Hindi, and Hinglish).

![KahaniKraftTales](https://img.shields.io/badge/KahaniKraftTales-AI%20Story%20Generator-blue)
![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green)
![Express](https://img.shields.io/badge/Express-4.18%2B-lightgrey)

## ✨ Features

### 🔍 **Smart Search Interface**
- Clean, intuitive search field for story prompts
- **Disabled button when input is empty** - prevents accidental clicks
- Real-time story generation with AI models
- Enter key support for quick generation
- Keyboard shortcuts (Ctrl/Cmd + Enter)

### 🤖 **Multiple AI Models**
- **Demo Mode**: Built-in mock stories for testing
- **ChatGPT**: OpenAI's GPT-3.5-turbo integration
- **Gemini**: Google's Gemini Pro integration
- **Smart Fallback**: Automatically shows demo stories when APIs fail
- **API Failure Notifications**: Red horizontal banner when APIs are unavailable

### 🌍 **Multilingual Support**
- **English**: Full English story generation
- **हिंदी (Hindi)**: Native Hindi story creation
- **Hinglish**: Perfect blend of Hindi and English

### 📖 **Story Management**
- **Pagination Controls**: Navigate through your story history
- **Local Storage**: Automatically saves your last 50 stories
- **Story Metadata**: Shows model used, language, and timestamp
- **Responsive Design**: Works perfectly on all devices

### 🎬 **Enhanced Navigation Effects** ✨ NEW!
- **Vibration Animation**: Story container shakes when navigating between stories
- **Flicker Effect**: Subtle opacity changes create a dynamic transition
- **Typewriter Animation**: Story content appears character by character like being typed
- **Combined Effects**: All animations work together for an immersive experience
- **Dynamic Speed**: Typewriter speed adjusts based on story length for optimal UX
- **Smooth Transitions**: Seamless navigation with visual feedback

### 🎨 **Modern UI/UX**
- **Component-Based Architecture**: Maintainable and scalable code
- **Horizontal Separators**: Clean visual separation between sections
- **Smooth Animations**: Engaging user experience with enhanced navigation effects
- **Loading States**: Beautiful book-flipping animation
- **Error Handling**: Graceful error messages with retry options
- **Interactive Demo**: Visit `/demo-effects.html` to see navigation effects in action

## 🏗️ **Project Structure**

```
KahaniKraftTales-KKT/
├── public/
│   ├── css/
│   │   ├── main.css                    # Base styles and layout
│   │   └── components/
│   │       ├── search-section.css      # Search interface styles
│   │       ├── pagination.css          # Navigation controls
│   │       ├── story-display.css       # Story presentation
│   │       └── loading-error.css       # Loading and error states
│   ├── js/
│   │   ├── app.js                      # Main application initialization
│   │   └── components/
│   │       ├── StoryApp.js             # Core application logic
│   │       └── UIManager.js            # UI management utilities
│   ├── assets/                         # Static assets (images, etc.)
│   └── index.html                      # Main HTML file
├── server.js                           # Express server with API endpoints
├── package.json                        # Dependencies and scripts
├── env.example                         # Environment variables template
└── README.md                           # Project documentation
```

## 🚀 **Quick Start**

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd KahaniKraftTales-KKT
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your API keys (optional - demo mode works without keys)
   ```

4. **Start the application**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔧 **Configuration**

### Environment Variables

Create a `.env` file with the following variables:

```env
# OpenAI API Key (for ChatGPT integration)
OPENAI_API_KEY=your_openai_api_key_here

# Google Gemini API Key (for Gemini integration)  
GEMINI_API_KEY=your_gemini_api_key_here

# Server Configuration
PORT=3000
```

**Note**: The application works perfectly in demo mode without any API keys!

### API Keys Setup

#### OpenAI (ChatGPT)
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account and generate an API key
3. Add to your `.env` file

#### Google Gemini
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create an account and generate an API key
3. Add to your `.env` file

## 🎯 **Usage**

### Basic Story Generation
1. Enter your story idea in the search box
2. Select your preferred AI model (Demo/ChatGPT/Gemini)
3. Choose your language (English/Hindi/Hinglish)
4. Click "Generate Story" or press Enter

### Navigation
- Use **Previous/Next** buttons to browse your story history
- Use **arrow keys** for quick navigation (when not focused on inputs)
- Stories are automatically saved locally

### 🎬 Enhanced Navigation Experience
When you click the **Previous** or **Next** buttons, enjoy the immersive effects:
- **Vibration**: The story container gently shakes to indicate transition
- **Flicker**: Subtle opacity changes create dynamic visual feedback
- **Typewriter**: Story content appears character by character as if being written
- **Auto-scroll**: Content stays in view during long story typing
- **Dynamic Speed**: Typing speed adjusts automatically based on story length

**Try the Demo**: Visit `http://localhost:3000/demo-effects.html` to test all effects individually!

### Keyboard Shortcuts
- **Enter**: Generate story (when input is focused)
- **Ctrl/Cmd + Enter**: Generate story (from anywhere)
- **Left/Right Arrow**: Navigate stories (when not in input fields)

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

### Code Style
- ES6+ JavaScript with classes
- Modular CSS with component separation
- Semantic HTML structure
- Mobile-first responsive design

## 🌟 **Features in Detail**

### Smart Input Validation
- Generate button automatically disables when input is empty
- Real-time validation feedback
- Prevents unnecessary API calls

### API Failure Handling
- Automatic fallback to demo stories when APIs fail
- Red notification banner for API failures
- Seamless user experience even with API issues

### Story Persistence
- Local storage for story history
- Automatic cleanup (keeps last 50 stories)
- Survives browser refreshes

### Responsive Design
- Mobile-first approach
- Tablet and desktop optimizations
- Touch-friendly interface

## 🎨 **Customization**

### Themes
Modify `public/css/main.css` to change:
- Color schemes
- Typography
- Layout spacing
- Animation timings

### Languages
Add new languages by:
1. Updating language options in HTML
2. Adding language prompts in `server.js`
3. Including demo stories for the new language

## 📱 **Browser Support**

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 **License**

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 **Created By**

**rimaurya** - Powered by AI Magic ❤️

---

**Enjoy crafting amazing stories with KahaniKraftTales!** ✨ 