const fs = require('fs');
const path = require('path');

// Determine build platform and configuration
const buildPlatform = process.env.BUILD_PLATFORM || 'generic';
const isGitHubPages = process.env.GITHUB_PAGES === 'true' || buildPlatform === 'github-pages';

// Platform-specific configurations
const platformConfigs = {
    'github-pages': {
        basePath: '/KahaniKraftTales-KKT',
        name: 'GitHub Pages'
    },
    'netlify': {
        basePath: '',
        name: 'Netlify'
    },
    'vercel': {
        basePath: '',
        name: 'Vercel'
    },
    'generic': {
        basePath: '',
        name: 'Generic Static Hosting'
    }
};

const config = platformConfigs[buildPlatform] || platformConfigs.generic;

console.log(`🔧 Building for ${config.name}...`);
if (config.basePath) {
    console.log(`📁 Using base path: ${config.basePath}`);
}

// Create dist directory
const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Copy public directory contents to dist
function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (let entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

// Copy public directory
const publicDir = path.join(__dirname, '..', 'public');
copyDir(publicDir, distDir);

// Copy data directory for demo stories
const dataDir = path.join(__dirname, '..', 'data');
const distDataDir = path.join(distDir, 'data');
if (fs.existsSync(dataDir)) {
    copyDir(dataDir, distDataDir);
}

// Create a static version of the app that doesn't require server
const staticAppJs = `
// Static version for ${config.name} deployment
class StaticStoryApp {
    constructor() {
        this.demoStories = null;
        this.basePath = '${config.basePath}';
        this.loadDemoStories();
        this.initializeApp();
    }

    async loadDemoStories() {
        try {
            const dataPath = this.basePath ? \`\${this.basePath}/data/demo-stories.json\` : './data/demo-stories.json';
            const response = await fetch(dataPath);
            this.demoStories = await response.json();
        } catch (error) {
            console.warn('Could not load demo stories, using fallback');
            this.demoStories = {
                english: [
                    "Once upon a time, in a magical kingdom far away, there lived a brave young adventurer who discovered a hidden treasure that would change their life forever. The treasure was not gold or silver, but something far more valuable - the power to bring stories to life through the magic of words."
                ],
                hindi: [
                    "एक समय की बात है, एक जादुई राज्य में एक बहादुर युवा साहसी रहता था जिसने एक छुपा हुआ खजाना खोजा जो उसके जीवन को हमेशा के लिए बदल देगा। यह खजाना सोना या चांदी नहीं था, बल्कि कुछ और भी कीमती था - शब्दों के जादू के माध्यम से कहानियों को जीवंत करने की शक्ति।"
                ],
                hinglish: [
                    "Ek time ki baat hai, ek magical kingdom mein ek brave young adventurer rehta tha jo ne ek hidden treasure discover kiya jo uski life ko forever change kar dega. Ye treasure gold ya silver nahi tha, balki kuch aur bhi valuable tha - words ke magic ke through stories ko life mein bring karne ki power।"
                ]
            };
        }
    }

    initializeApp() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupEventListeners());
        } else {
            this.setupEventListeners();
        }
    }

    setupEventListeners() {
        const generateBtn = document.getElementById('generateBtn');
        const storyPrompt = document.getElementById('storyPrompt');
        const retryBtn = document.getElementById('retryBtn');

        if (generateBtn) {
            generateBtn.addEventListener('click', () => this.generateStory());
        }

        if (storyPrompt) {
            storyPrompt.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.generateStory();
                }
            });
        }

        if (retryBtn) {
            retryBtn.addEventListener('click', () => this.generateStory());
        }
    }

    async generateStory() {
        const prompt = document.getElementById('storyPrompt').value.trim();
        const language = document.getElementById('languageSelect').value;
        const model = document.getElementById('modelSelect').value;

        if (!prompt) {
            this.showError('Please enter a story prompt');
            return;
        }

        this.showLoading();

        // Simulate API delay for better UX
        setTimeout(() => {
            const story = this.getRandomDemoStory(language);
            this.displayStory({
                prompt: prompt,
                story: story,
                language: language,
                model: 'demo',
                timestamp: new Date().toISOString()
            });
        }, 2000);
    }

    getRandomDemoStory(language) {
        if (!this.demoStories) return "Story is being crafted...";
        
        const stories = this.demoStories[language] || this.demoStories.english;
        return stories[Math.floor(Math.random() * stories.length)];
    }

    showLoading() {
        document.getElementById('storySection').style.display = 'none';
        document.getElementById('errorContainer').style.display = 'none';
        document.getElementById('loadingContainer').style.display = 'block';
    }

    showError(message) {
        document.getElementById('loadingContainer').style.display = 'none';
        document.getElementById('storySection').style.display = 'none';
        document.getElementById('errorText').textContent = message;
        document.getElementById('errorContainer').style.display = 'block';
    }

    displayStory(data) {
        document.getElementById('loadingContainer').style.display = 'none';
        document.getElementById('errorContainer').style.display = 'none';
        
        // Update story content
        document.getElementById('currentPrompt').textContent = data.prompt;
        document.getElementById('currentModel').textContent = data.model.toUpperCase();
        document.getElementById('currentLanguage').textContent = data.language.charAt(0).toUpperCase() + data.language.slice(1);
        document.getElementById('currentTime').textContent = new Date(data.timestamp).toLocaleTimeString();
        
        // Display story with typewriter effect
        this.typewriterEffect(document.getElementById('storyContent'), data.story);
        
        document.getElementById('storySection').style.display = 'block';
    }

    typewriterEffect(element, text, speed = 30) {
        element.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        typeWriter();
    }
}

// Initialize the static app
new StaticStoryApp();
`;

// Write the static app file
fs.writeFileSync(path.join(distDir, 'js', 'static-app.js'), staticAppJs);

// Update the index.html to use static app
const indexPath = path.join(distDir, 'index.html');
let indexContent = fs.readFileSync(indexPath, 'utf8');

// Replace the script tags to use static version
indexContent = indexContent.replace(
    /<script src="js\/components\/StoryApp\.js"><\/script>\s*<script src="js\/components\/UIManager\.js"><\/script>\s*<script src="js\/app\.js"><\/script>/,
    '<script src="js/static-app.js"></script>'
);

// Update paths for platforms that need base paths
if (config.basePath) {
    // Update CSS links
    indexContent = indexContent.replace(/href="css\//g, `href="${config.basePath}/css/`);
    
    // Update JS links
    indexContent = indexContent.replace(/src="js\//g, `src="${config.basePath}/js/`);
    
    // Update any other asset references
    indexContent = indexContent.replace(/src="assets\//g, `src="${config.basePath}/assets/`);
    indexContent = indexContent.replace(/href="assets\//g, `href="${config.basePath}/assets/`);
}

// Add platform-specific meta tags
const platformMeta = buildPlatform === 'github-pages' 
    ? '\n    <meta name="deployment-platform" content="github-pages">'
    : `\n    <meta name="deployment-platform" content="${buildPlatform}">`;

indexContent = indexContent.replace('</head>', `${platformMeta}\n</head>`);

fs.writeFileSync(indexPath, indexContent);

// Create platform-specific deployment info
const deploymentInfo = {
    platform: buildPlatform,
    basePath: config.basePath,
    buildTime: new Date().toISOString(),
    nodeVersion: process.version
};

fs.writeFileSync(path.join(distDir, 'deployment-info.json'), JSON.stringify(deploymentInfo, null, 2));

console.log('✅ Static build completed successfully!');
console.log(`📁 Output directory: dist/`);
console.log(`🚀 Ready for ${config.name} deployment`);
if (config.basePath) {
    console.log(`🔗 Base path configured: ${config.basePath}`);
}
console.log(`📋 Deployment info saved to: dist/deployment-info.json`); 