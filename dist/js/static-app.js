
// Static version for GitHub Pages deployment
class StaticStoryApp {
    constructor() {
        this.demoStories = null;
        this.loadDemoStories();
        this.initializeApp();
    }

    async loadDemoStories() {
        try {
            const response = await fetch('./data/demo-stories.json');
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
