// Main Application Initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the app
    window.storyApp = new StoryApp();
    
    // Add some helpful console messages
    console.log('🎭 KahaniKraftTales initialized successfully!');
    console.log('📚 Ready to generate amazing stories in multiple languages');
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Enter to generate story
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            if (window.storyApp.isInputValid() && !window.storyApp.isLoading) {
                window.storyApp.generateStory();
            }
        }
        
        // Arrow keys for navigation when not focused on input
        if (document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'SELECT') {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                window.storyApp.navigateStory(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                window.storyApp.navigateStory(1);
            }
        }
    });
    
    // Add focus management
    const searchInput = document.getElementById('storyPrompt');
    searchInput.focus();
    
    // Add placeholder rotation for fun
    const placeholders = [
        "Enter your story idea... (e.g., 'A magical forest adventure')",
        "What story shall we craft today? (e.g., 'A robot learning to dance')",
        "Describe your dream story... (e.g., 'A time-traveling chef')",
        "Let your imagination flow... (e.g., 'A talking library book')",
        "What adventure awaits? (e.g., 'A superhero cat')"
    ];
    
    let placeholderIndex = 0;
    setInterval(() => {
        if (searchInput.value === '') {
            placeholderIndex = (placeholderIndex + 1) % placeholders.length;
            searchInput.placeholder = placeholders[placeholderIndex];
        }
    }, 5000);
}); 