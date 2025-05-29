const fs = require('fs');
const path = require('path');

// Determine build platform and configuration
const buildPlatform = process.env.BUILD_PLATFORM || 'generic';
const isGitHubPages = process.env.GITHUB_PAGES === 'true' || buildPlatform === 'github-pages';

// Platform-specific configurations
const platformConfigs = {
    'github-pages': {
        basePath: '/KahaniKraftTales-KKT',
        name: 'GitHub Pages',
        useSecrets: true
    },
    'netlify': {
        basePath: '',
        name: 'Netlify',
        useSecrets: true
    },
    'vercel': {
        basePath: '',
        name: 'Vercel',
        useSecrets: true
    },
    'generic': {
        basePath: '',
        name: 'Generic Static Hosting',
        useSecrets: false
    }
};

const config = platformConfigs[buildPlatform] || platformConfigs.generic;

console.log(`🔧 Building for ${config.name}...`);
if (config.basePath) {
    console.log(`📁 Using base path: ${config.basePath}`);
}
if (config.useSecrets) {
    console.log(`🔐 Using secure environment variables for API keys`);
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
        this.apiKeys = this.loadApiKeys();
        this.loadDemoStories();
        this.initializeApp();
    }

    loadApiKeys() {
        // For static deployments, API keys come from environment variables
        // These are injected at build time from GitHub Secrets or platform env vars
        return {
            openai: '${process.env.OPENAI_API_KEY || ''}',
            gemini: '${process.env.GEMINI_API_KEY || ''}',
            anthropic: '${process.env.ANTHROPIC_API_KEY || ''}'
        };
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

        // Update model options based on available API keys
        this.updateModelOptions();
    }

    updateModelOptions() {
        const modelSelect = document.getElementById('modelSelect');
        const options = modelSelect.querySelectorAll('option');
        
        options.forEach(option => {
            const value = option.value;
            if (value === 'openai-chatgpt' && !this.apiKeys.openai) {
                option.disabled = true;
                option.textContent += ' (API Key Required)';
            } else if (value === 'google-gemini' && !this.apiKeys.gemini) {
                option.disabled = true;
                option.textContent += ' (API Key Required)';
            } else if (value === 'anthropic-claude' && !this.apiKeys.anthropic) {
                option.disabled = true;
                option.textContent += ' (API Key Required)';
            }
        });
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

        try {
            let story = '';
            
            if (model === 'demo') {
                // Simulate API delay for better UX
                await new Promise(resolve => setTimeout(resolve, 2000));
                story = this.getRandomDemoStory(language);
            } else {
                story = await this.callAIAPI(prompt, model, language);
            }

            this.displayStory({
                prompt: prompt,
                story: story,
                language: language,
                model: model,
                timestamp: new Date().toISOString()
            });
        } catch (error) {
            console.error('Story generation error:', error);
            this.showError(error.message || 'Failed to generate story. Please try again.');
        }
    }

    async callAIAPI(prompt, model, language) {
        const languagePrompts = {
            english: \`Write a creative and engaging story based on this prompt: "\${prompt}". Make it interesting and imaginative.\`,
            hindi: \`इस विषय पर एक रचनात्मक और दिलचस्प कहानी लिखें: "\${prompt}"। इसे दिलचस्प और कल्पनाशील बनाएं।\`,
            hinglish: \`Is prompt ke basis par ek creative aur engaging story likhiye: "\${prompt}". Ise interesting aur imaginative banayiye.\`
        };

        const fullPrompt = languagePrompts[language] || languagePrompts.english;

        if (model === 'openai-chatgpt') {
            return await this.callOpenAI(fullPrompt);
        } else if (model === 'google-gemini') {
            return await this.callGemini(fullPrompt);
        } else if (model === 'anthropic-claude') {
            return await this.callAnthropic(fullPrompt);
        } else {
            throw new Error('Invalid model selected');
        }
    }

    async callOpenAI(prompt) {
        if (!this.apiKeys.openai) {
            throw new Error('OpenAI API key not configured. Using demo mode instead.');
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': \`Bearer \${this.apiKeys.openai}\`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 1500,
                temperature: 0.8
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(\`OpenAI API Error: \${error.error?.message || 'Unknown error'}\`);
        }

        const data = await response.json();
        return data.choices[0].message.content.trim();
    }

    async callGemini(prompt) {
        if (!this.apiKeys.gemini) {
            throw new Error('Google Gemini API key not configured. Using demo mode instead.');
        }

        const response = await fetch(\`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=\${this.apiKeys.gemini}\`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.8,
                    maxOutputTokens: 1500
                }
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(\`Google Gemini API Error: \${error.error?.message || 'Unknown error'}\`);
        }

        const data = await response.json();
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text.trim();
        } else {
            throw new Error('Invalid response from Gemini API');
        }
    }

    async callAnthropic(prompt) {
        if (!this.apiKeys.anthropic) {
            throw new Error('Anthropic Claude API key not configured. Using demo mode instead.');
        }

        // Note: Anthropic API requires server-side calls due to CORS restrictions
        // For static deployments, we'll show an informative error
        throw new Error('Anthropic Claude requires server-side implementation. Please use demo mode or other models for static deployments.');
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