// Main Application Class
class StoryApp {
    constructor() {
        this.stories = [];
        this.currentIndex = 0;
        this.isLoading = false;
        this.hasShownOutputPanel = false; // Track if output panel has been shown
        this.isFirstSearch = true; // Track if this is the first search for animation
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadStoriesFromStorage();
        this.updateUI();
        this.updateGenerateButtonState();
        
        // Check if we have existing stories to determine initial state
        if (this.stories.length > 0) {
            this.hasShownOutputPanel = true;
            this.isFirstSearch = false; // Not first search if we have existing stories
        }
    }

    bindEvents() {
        // Generate button click
        document.getElementById('generateBtn').addEventListener('click', () => {
            this.generateStory();
        });

        // Enter key in search input
        document.getElementById('storyPrompt').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !this.isLoading && this.isInputValid()) {
                this.generateStory();
            }
        });

        // Input change handler to update button state
        document.getElementById('storyPrompt').addEventListener('input', () => {
            this.updateGenerateButtonState();
        });

        // Inline pagination buttons
        document.getElementById('prevBtnInline').addEventListener('click', () => {
            this.navigateStory(-1);
        });

        document.getElementById('nextBtnInline').addEventListener('click', () => {
            this.navigateStory(1);
        });

        // Retry button
        document.getElementById('retryBtn').addEventListener('click', () => {
            this.hideError();
            this.generateStory();
        });

        // Model and language change handlers
        document.getElementById('modelSelect').addEventListener('change', () => {
            this.updateCurrentStoryDisplay();
        });

        document.getElementById('languageSelect').addEventListener('change', () => {
            this.updateCurrentStoryDisplay();
        });
    }

    isInputValid() {
        const prompt = document.getElementById('storyPrompt').value.trim();
        return prompt.length > 0;
    }

    updateGenerateButtonState() {
        const generateBtn = document.getElementById('generateBtn');
        const isValid = this.isInputValid();
        
        generateBtn.disabled = !isValid || this.isLoading;
        
        if (!isValid) {
            generateBtn.style.opacity = '0.5';
            generateBtn.style.cursor = 'not-allowed';
        } else if (!this.isLoading) {
            generateBtn.style.opacity = '1';
            generateBtn.style.cursor = 'pointer';
        }
    }

    async generateStory() {
        const prompt = document.getElementById('storyPrompt').value.trim();
        const model = document.getElementById('modelSelect').value;
        const language = document.getElementById('languageSelect').value;

        if (!prompt) {
            this.showError('Please enter a story prompt!');
            return;
        }

        if (this.isLoading) return;

        this.showLoading();
        this.hideError();
        this.hideApiFailureNotification();

        try {
            const response = await fetch('/api/generate-story', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt,
                    model,
                    language
                })
            });

            const data = await response.json();

            let story = '';
            let isApiFallback = false;

            if (!response.ok) {
                // If API failed but we have fallback, use it and show notification
                if (data.fallback && (model === 'openai-chatgpt' || model === 'google-gemini')) {
                    story = data.fallback;
                    isApiFallback = true;
                } else {
                    throw new Error(data.error || 'Failed to generate story');
                }
            } else {
                story = data.story;
                // Check if response indicates API failure with fallback
                if (data.fallback && data.error && (model === 'openai-chatgpt' || model === 'google-gemini')) {
                    story = data.fallback;
                    isApiFallback = true;
                }
            }

            // Add the new story to the beginning of the array
            const newStory = {
                id: Date.now(),
                prompt: data.prompt || prompt,
                story: story,
                language: data.language || language,
                model: data.model || model,
                timestamp: data.timestamp || new Date().toISOString(),
                isApiFallback: isApiFallback
            };

            this.stories.unshift(newStory);
            this.currentIndex = 0;
            this.saveStoriesToStorage();
            this.updateUI();
            
            // Only animate and scroll for the very first search
            if (this.isFirstSearch) {
                this.showStory(); // This triggers the fan-out animation
                this.isFirstSearch = false; // Mark that first search is done
                
                // Auto-scroll only for first search when no output panel was shown before
                if (!this.hasShownOutputPanel) {
                    this.hasShownOutputPanel = true;
                    this.scrollToOutputPanel();
                }
            } else {
                // For subsequent searches, just show without animation
                this.showStoryWithoutAnimation();
            }

            // Show API failure notification if needed
            if (isApiFallback) {
                this.showApiFailureNotification(model);
            }

            // Clear the input
            document.getElementById('storyPrompt').value = '';
            this.updateGenerateButtonState();

        } catch (error) {
            console.error('Error generating story:', error);
            this.showError(error.message || 'Failed to generate story. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    navigateStory(direction) {
        const newIndex = this.currentIndex + direction;
        
        if (newIndex >= 0 && newIndex < this.stories.length) {
            this.currentIndex = newIndex;
            
            // Update pagination first
            this.updatePagination();
            
            // Show story with navigation effects (vibration, flicker, and typewriter)
            const slideDirection = direction > 0 ? 'right' : 'left';
            this.showStoryWithNavigationEffects(slideDirection);
        }
    }

    updateUI() {
        this.updatePagination();
        this.updateCurrentStoryDisplay();
        this.updateGenerateButtonState();
        
        // Add or remove 'has-stories' class based on whether stories exist
        const container = document.querySelector('.container');
        if (this.stories.length > 0) {
            container.classList.add('has-stories');
        } else {
            container.classList.remove('has-stories');
        }
    }

    scrollToOutputPanel() {
        // Wait for the animation to start, then scroll
        setTimeout(() => {
            const storySection = document.getElementById('storySection');
            if (storySection) {
                storySection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }
        }, 200); // Small delay to let the fan-out animation begin
    }

    saveStoriesToStorage() {
        try {
            // Keep only the last 50 stories to prevent storage overflow
            const storiesToSave = this.stories.slice(0, 50);
            localStorage.setItem('kahaniKraftTales_stories', JSON.stringify(storiesToSave));
        } catch (error) {
            console.warn('Failed to save stories to localStorage:', error);
        }
    }

    loadStoriesFromStorage() {
        try {
            const savedStories = localStorage.getItem('kahaniKraftTales_stories');
            if (savedStories) {
                this.stories = JSON.parse(savedStories);
                this.currentIndex = 0;
            }
        } catch (error) {
            console.warn('Failed to load stories from localStorage:', error);
            this.stories = [];
        }
    }
} 