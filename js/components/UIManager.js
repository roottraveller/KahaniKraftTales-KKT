// UI Management Methods for StoryApp
class UIManager {
    static updatePagination(stories, currentIndex) {
        const storyPagination = document.getElementById('storyPagination');
        const prevBtnInline = document.getElementById('prevBtnInline');
        const nextBtnInline = document.getElementById('nextBtnInline');
        const pageInfoInline = document.getElementById('pageInfoInline');

        if (stories.length === 0) {
            storyPagination.style.display = 'none';
            return;
        }

        if (stories.length > 1) {
            storyPagination.style.display = 'flex';
            
            // Update buttons
            prevBtnInline.disabled = currentIndex === 0;
            nextBtnInline.disabled = currentIndex === stories.length - 1;
            
            // Update page info
            pageInfoInline.textContent = `${currentIndex + 1} of ${stories.length}`;
        } else {
            storyPagination.style.display = 'none';
        }
    }

    static updateCurrentStoryDisplay(stories, currentIndex) {
        const storySection = document.getElementById('storySection');
        
        if (stories.length === 0 || currentIndex >= stories.length) {
            storySection.style.display = 'none';
            return;
        }

        const story = stories[currentIndex];
        
        // Update story content
        document.getElementById('currentPrompt').textContent = story.prompt;
        document.getElementById('storyContent').textContent = story.story;
        
        // Update tags
        document.getElementById('currentModel').textContent = story.model.toUpperCase();
        document.getElementById('currentLanguage').textContent = UIManager.getLanguageDisplayName(story.language);
        document.getElementById('currentTime').textContent = UIManager.formatTimestamp(story.timestamp);
        
        storySection.style.display = 'block';
    }

    static getLanguageDisplayName(language) {
        const languageMap = {
            'english': 'English',
            'hindi': 'हिंदी',
            'hinglish': 'Hinglish'
        };
        return languageMap[language] || language;
    }

    static formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        
        if (diffInMinutes < 1) return 'Just now';
        if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
        
        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) return `${diffInHours}h ago`;
        
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;
        
        return date.toLocaleDateString();
    }

    static showLoading() {
        document.getElementById('loadingContainer').style.display = 'flex';
        document.getElementById('storySection').style.display = 'none';
        document.getElementById('errorContainer').style.display = 'none';
    }

    static hideLoading() {
        document.getElementById('loadingContainer').style.display = 'none';
    }

    static showStory() {
        const storySection = document.getElementById('storySection');
        
        // Hide other sections
        document.getElementById('errorContainer').style.display = 'none';
        document.getElementById('loadingContainer').style.display = 'none';
        
        // Reset animation state
        storySection.classList.remove('animate-in');
        storySection.style.display = 'block';
        
        // Trigger fan-out animation
        requestAnimationFrame(() => {
            storySection.classList.add('animate-in');
        });
    }

    static showStoryWithoutAnimation() {
        const storySection = document.getElementById('storySection');
        
        // Hide other sections
        document.getElementById('errorContainer').style.display = 'none';
        document.getElementById('loadingContainer').style.display = 'none';
        
        // Show story section without animation
        storySection.classList.remove('animate-in');
        storySection.style.display = 'block';
        
        // Force immediate display without animation
        storySection.style.opacity = '1';
        storySection.style.transform = 'translateY(0) scaleY(1)';
    }

    static showStoryWithSlideTransition(direction) {
        const storySection = document.getElementById('storySection');
        
        // Hide other sections
        document.getElementById('errorContainer').style.display = 'none';
        document.getElementById('loadingContainer').style.display = 'none';
        
        // Remove any existing animation classes and reset styles
        storySection.classList.remove('animate-in', 'slide-left', 'slide-right');
        storySection.style.display = 'block';
        storySection.style.opacity = '1';
        storySection.style.transform = 'translateY(0) scaleY(1)';
        
        // Add slide animation based on direction
        requestAnimationFrame(() => {
            if (direction === 'left') {
                storySection.classList.add('slide-left');
            } else if (direction === 'right') {
                storySection.classList.add('slide-right');
            }
            
            // Clean up animation class after animation completes
            setTimeout(() => {
                storySection.classList.remove('slide-left', 'slide-right');
            }, 300);
        });
    }

    static showStoryWithNavigationEffects(stories, currentIndex, direction) {
        const storySection = document.getElementById('storySection');
        
        // Hide other sections
        document.getElementById('errorContainer').style.display = 'none';
        document.getElementById('loadingContainer').style.display = 'none';
        
        // Remove any existing animation classes
        storySection.classList.remove('animate-in', 'slide-left', 'slide-right', 'vibrate-effect', 'flicker-effect');
        storySection.style.display = 'block';
        
        // Show content immediately without typewriter effect
        UIManager.updateCurrentStoryDisplay(stories, currentIndex);
    }

    static showError(message) {
        document.getElementById('errorText').textContent = message;
        document.getElementById('errorContainer').style.display = 'flex';
        document.getElementById('loadingContainer').style.display = 'none';
        document.getElementById('storySection').style.display = 'none';
    }

    static hideError() {
        document.getElementById('errorContainer').style.display = 'none';
    }

    static showApiFailureNotification(model) {
        // Remove existing notification if any
        UIManager.hideApiFailureNotification();
        
        const storySection = document.getElementById('storySection');
        const notification = document.createElement('div');
        notification.className = 'api-failure-notification';
        notification.id = 'apiFailureNotification';
        
        const modelName = model === 'openai-chatgpt' ? 'OpenAI ChatGPT' : 
                         model === 'google-gemini' ? 'Google Gemini' : 
                         model === 'anthropic-claude' ? 'Anthropic Claude' : model;
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-exclamation-triangle"></i>
                <span>${modelName} API is currently unavailable. Showing demo story instead.</span>
                <button class="notification-close" onclick="window.storyApp.hideApiFailureNotification()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        // Insert notification before story content
        const storyContainer = storySection.querySelector('.story-container');
        storyContainer.insertBefore(notification, storyContainer.firstChild);
    }

    static hideApiFailureNotification() {
        const notification = document.getElementById('apiFailureNotification');
        if (notification) {
            notification.remove();
        }
    }
}

// Extend StoryApp with UI methods
Object.assign(StoryApp.prototype, {
    updatePagination() {
        UIManager.updatePagination(this.stories, this.currentIndex);
    },

    updateCurrentStoryDisplay() {
        UIManager.updateCurrentStoryDisplay(this.stories, this.currentIndex);
    },

    showLoading() {
        this.isLoading = true;
        this.updateGenerateButtonState();
        UIManager.showLoading();
    },

    hideLoading() {
        this.isLoading = false;
        this.updateGenerateButtonState();
        UIManager.hideLoading();
    },

    showStory() {
        UIManager.showStory();
    },

    showStoryWithoutAnimation() {
        UIManager.showStoryWithoutAnimation();
    },

    showStoryWithSlideTransition(direction) {
        UIManager.showStoryWithSlideTransition(direction);
    },

    showStoryWithNavigationEffects(direction) {
        UIManager.showStoryWithNavigationEffects(this.stories, this.currentIndex, direction);
    },

    showError(message) {
        UIManager.showError(message);
    },

    hideError() {
        UIManager.hideError();
    },

    showApiFailureNotification(model) {
        UIManager.showApiFailureNotification(model);
    },

    hideApiFailureNotification() {
        UIManager.hideApiFailureNotification();
    }
}); 