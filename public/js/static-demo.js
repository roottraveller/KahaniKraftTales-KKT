// Static Demo Version for GitHub Pages
// This version works without a backend server using only demo stories

class StaticStoryApp {
    constructor() {
        this.stories = [];
        this.currentIndex = 0;
        this.isLoading = false;
        this.hasShownOutputPanel = false;
        this.isFirstSearch = true;
        this.demoStories = {
            english: [
                {
                    id: Date.now() + 1,
                    prompt: "A magical adventure in an enchanted forest",
                    story: "In the heart of the Whispering Woods, where ancient trees held secrets older than time itself, young Maya discovered a peculiar glowing stone. As her fingers touched its smooth surface, the forest around her began to shimmer and transform. Flowers bloomed in impossible colors, their petals singing soft melodies that danced through the air. A wise old owl perched nearby, its golden eyes twinkling with ancient knowledge. 'Welcome, chosen one,' the owl spoke, its voice like rustling leaves. 'You have awakened the Heart of the Forest. With it comes great responsibility and even greater adventure.' Maya felt a surge of courage flow through her as magical creatures emerged from behind every tree - friendly sprites with butterfly wings, talking foxes with silver fur, and gentle giants made of living wood. Together, they embarked on a quest to restore balance to the magical realm, facing challenges that tested not just her bravery, but her kindness and wisdom. Through enchanted valleys and crystal caves, Maya learned that true magic comes from believing in oneself and the power of friendship. As the sun set over the mystical landscape, painting the sky in shades of purple and gold, Maya realized that this was just the beginning of her extraordinary journey.",
                    language: "english",
                    model: "demo",
                    timestamp: new Date().toISOString(),
                    isApiFallback: false
                },
                {
                    id: Date.now() + 2,
                    prompt: "A space explorer discovers a new planet",
                    story: "Captain Elena Rodriguez gazed through the viewport of her spacecraft, the Stellar Wanderer, as an uncharted planet came into view. Its surface shimmered with bioluminescent oceans and floating islands that defied gravity. After months of traveling through the void of space, this discovery could change everything humanity knew about life in the universe. As her ship descended through the planet's atmosphere, she noticed the air itself seemed to sparkle with tiny, dancing lights. The landing was smooth, and as Elena stepped onto the alien soil, she felt a strange tingling sensation through her boots. The ground beneath her feet was soft and warm, pulsing gently like a heartbeat. Crystalline trees stretched toward twin suns, their branches chiming like wind bells in the gentle breeze. In the distance, she spotted movement - graceful beings that seemed to be made of pure light, gliding effortlessly between the floating islands. They communicated through colors that rippled across their translucent forms, creating a beautiful symphony of hues. Elena realized she wasn't just discovering a new planet; she was witnessing an entirely new form of consciousness. As she documented her findings, she knew this moment would mark the beginning of a new era for both civilizations - one of understanding, wonder, and infinite possibilities among the stars.",
                    language: "english",
                    model: "demo",
                    timestamp: new Date().toISOString(),
                    isApiFallback: false
                }
            ],
            hindi: [
                {
                    id: Date.now() + 3,
                    prompt: "एक जादुई किताब की कहानी",
                    story: "राजू के दादाजी की पुरानी अटारी में धूल से भरी एक अनोखी किताब मिली। जैसे ही उसने किताब खोली, उसके पन्ने सुनहरी रोशनी से चमकने लगे। अचानक किताब से एक छोटी परी निकली, जिसके पंख इंद्रधनुष के रंगों से भरे थे। 'मैं इस किताब की रक्षक हूँ,' परी ने मधुर आवाज में कहा। 'तुम्हारे दिल में सच्चाई है, इसलिए तुम मुझे देख सकते हो।' परी ने बताया कि यह कोई साधारण किताब नहीं थी, बल्कि एक जादुई संसार का द्वार थी। राजू ने देखा कि किताब के हर पन्ने पर अलग-अलग दुनिया थी - कहीं बर्फीले पहाड़, कहीं रंग-बिरंगे फूलों के बगीचे, और कहीं तैरते हुए महल। परी ने राजू को बताया कि वह इन सभी जगहों पर जा सकता है, लेकिन उसे हमेशा दयालु और ईमानदार रहना होगा। राजू ने अपनी पहली यात्रा एक ऐसे गाँव में की जहाँ सभी जानवर इंसानों की तरह बात करते थे। वहाँ उसने एक छोटे खरगोश की मदद की और सीखा कि सच्ची खुशी दूसरों की मदद करने में है।",
                    language: "hindi",
                    model: "demo",
                    timestamp: new Date().toISOString(),
                    isApiFallback: false
                }
            ],
            hinglish: [
                {
                    id: Date.now() + 4,
                    prompt: "College ke dost aur ek adventure",
                    story: "Arjun, Priya, aur Rohit college ke best friends the. Summer vacation mein, unhone decide kiya ki kuch exciting karna hai. Arjun ke uncle ka ek purana farmhouse tha hills mein, jo years se band pada tha. 'Yaar, let's go there for a week,' Arjun ne suggest kiya. 'Adventure hoga aur thoda peace bhi milega city ki hustle-bustle se.' Jab woh farmhouse pahunche, toh dekha ki woh bilkul haunted house jaisa lag raha tha - creaky doors, spider webs everywhere, aur ek mysterious attic. But instead of getting scared, trio ko aur exciting laga. Priya, jo photography ki shaukeen thi, started clicking pictures of the old architecture. Rohit, being the foodie, decided to cook something special in the rusty kitchen. Aur Arjun explored the attic, jahan use ek old diary mili. Diary mein likha tha about a hidden treasure somewhere in the property. 'Guys, this is like a real-life treasure hunt!' Arjun exclaimed. Next few days mein, they followed the clues, solved puzzles, aur finally found a small chest buried under an old mango tree. Inside the chest, there wasn't gold or jewels, but old photographs aur letters of Arjun's great-grandfather, jo ek freedom fighter tha. Yeh discovery unke liye actual treasure se bhi zyada valuable thi. Woh realize kiye ki sometimes the best adventures are the ones that connect you with your roots aur bring friends closer together.",
                    language: "hinglish",
                    model: "demo",
                    timestamp: new Date().toISOString(),
                    isApiFallback: false
                }
            ]
        };
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadStoriesFromStorage();
        this.updateUI();
        this.updateGenerateButtonState();
        
        if (this.stories.length > 0) {
            this.hasShownOutputPanel = true;
            this.isFirstSearch = false;
        }
    }

    bindEvents() {
        document.getElementById('generateBtn').addEventListener('click', () => {
            this.generateStory();
        });

        document.getElementById('storyPrompt').addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !this.isLoading && this.isInputValid()) {
                this.generateStory();
            }
        });

        document.getElementById('storyPrompt').addEventListener('input', () => {
            this.updateGenerateButtonState();
        });

        document.getElementById('prevBtnInline').addEventListener('click', () => {
            this.navigateStory(-1);
        });

        document.getElementById('nextBtnInline').addEventListener('click', () => {
            this.navigateStory(1);
        });

        document.getElementById('retryBtn').addEventListener('click', () => {
            this.hideError();
            this.generateStory();
        });

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
        const language = document.getElementById('languageSelect').value;

        if (!prompt) {
            this.showError('Please enter a story prompt!');
            return;
        }

        if (this.isLoading) return;

        this.showLoading();
        this.hideError();
        this.hideApiFailureNotification();

        // Simulate API delay
        setTimeout(() => {
            try {
                // Get random demo story based on language
                const languageStories = this.demoStories[language] || this.demoStories.english;
                const randomStory = languageStories[Math.floor(Math.random() * languageStories.length)];
                
                // Create new story with user's prompt
                const newStory = {
                    id: Date.now(),
                    prompt: prompt,
                    story: randomStory.story,
                    language: language,
                    model: 'demo',
                    timestamp: new Date().toISOString(),
                    isApiFallback: false
                };

                this.stories.unshift(newStory);
                this.currentIndex = 0;
                this.saveStoriesToStorage();
                this.updateUI();
                
                if (this.isFirstSearch) {
                    this.showStory();
                    this.isFirstSearch = false;
                    
                    if (!this.hasShownOutputPanel) {
                        this.hasShownOutputPanel = true;
                        this.scrollToOutputPanel();
                    }
                } else {
                    this.showStoryWithoutAnimation();
                }

                // Show demo notification
                this.showDemoNotification();

                document.getElementById('storyPrompt').value = '';
                this.updateGenerateButtonState();

            } catch (error) {
                console.error('Error generating story:', error);
                this.showError('Failed to generate story. Please try again.');
            } finally {
                this.hideLoading();
            }
        }, 1500); // Simulate API delay
    }

    showDemoNotification() {
        const notification = document.getElementById('apiFailureNotification');
        if (notification) {
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas fa-info-circle"></i>
                    <div class="notification-text">
                        <strong>Demo Mode</strong>
                        <p>This is a static demo version. In the full version, AI models generate custom stories based on your prompts.</p>
                    </div>
                    <button class="notification-close" onclick="this.parentElement.parentElement.style.display='none'">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            notification.style.display = 'block';
            notification.style.background = 'linear-gradient(135deg, rgba(33, 150, 243, 0.1), rgba(33, 150, 243, 0.05))';
            notification.style.borderColor = 'rgba(33, 150, 243, 0.3)';
        }
    }

    navigateStory(direction) {
        const newIndex = this.currentIndex + direction;
        
        if (newIndex >= 0 && newIndex < this.stories.length) {
            this.currentIndex = newIndex;
            this.updatePagination();
            const slideDirection = direction > 0 ? 'right' : 'left';
            this.showStoryWithNavigationEffects(slideDirection);
        }
    }

    // Delegate other methods to UIManager
    updateUI() {
        if (window.uiManager) {
            window.uiManager.updatePagination(this.stories, this.currentIndex);
            window.uiManager.updateCurrentStoryDisplay(this.stories, this.currentIndex);
            this.updateGenerateButtonState();
            
            const container = document.querySelector('.container');
            if (this.stories.length > 0) {
                container.classList.add('has-stories');
            } else {
                container.classList.remove('has-stories');
            }
        }
    }

    updatePagination() {
        if (window.uiManager) {
            window.uiManager.updatePagination(this.stories, this.currentIndex);
        }
    }

    updateCurrentStoryDisplay() {
        if (window.uiManager) {
            window.uiManager.updateCurrentStoryDisplay(this.stories, this.currentIndex);
        }
    }

    showStory() {
        if (window.uiManager) {
            window.uiManager.showStory();
        }
    }

    showStoryWithoutAnimation() {
        if (window.uiManager) {
            window.uiManager.showStoryWithoutAnimation();
        }
    }

    showStoryWithNavigationEffects(slideDirection) {
        if (window.uiManager) {
            window.uiManager.showStoryWithNavigationEffects(slideDirection);
        }
    }

    showLoading() {
        if (window.uiManager) {
            window.uiManager.showLoading();
        }
    }

    hideLoading() {
        if (window.uiManager) {
            window.uiManager.hideLoading();
        }
    }

    showError(message) {
        if (window.uiManager) {
            window.uiManager.showError(message);
        }
    }

    hideError() {
        if (window.uiManager) {
            window.uiManager.hideError();
        }
    }

    hideApiFailureNotification() {
        if (window.uiManager) {
            window.uiManager.hideApiFailureNotification();
        }
    }

    scrollToOutputPanel() {
        setTimeout(() => {
            const storySection = document.getElementById('storySection');
            if (storySection) {
                storySection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                    inline: 'nearest'
                });
            }
        }, 200);
    }

    saveStoriesToStorage() {
        try {
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

// Initialize the static demo app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize UI Manager first
    window.uiManager = new UIManager();
    
    // Then initialize the static story app
    window.storyApp = new StaticStoryApp();
}); 