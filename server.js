const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Anthropic client only if API key is available
let anthropic = null;
if (process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY !== 'your_anthropic_api_key_here') {
    try {
        anthropic = new Anthropic({
            apiKey: process.env.ANTHROPIC_API_KEY,
        });
    } catch (error) {
        console.error('Failed to initialize Anthropic client:', error.message);
    }
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Load demo stories from JSON file
let demoStories;
try {
    const demoStoriesPath = path.join(__dirname, 'data', 'demo-stories.json');
    demoStories = JSON.parse(fs.readFileSync(demoStoriesPath, 'utf8'));
} catch (error) {
    console.error('Error loading demo stories:', error.message);
    // Fallback to basic stories if file can't be loaded
    demoStories = {
        english: ["A magical adventure awaits in the enchanted forest..."],
        hindi: ["एक जादुई साहसिक यात्रा मंत्रमुग्ध जंगल में इंतजार कर रही है..."],
        hinglish: ["Ek magical adventure enchanted forest mein wait kar raha hai..."]
    };
}

// Serve the main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Helper function to get random demo story
function getRandomDemoStory(language) {
    const stories = demoStories[language] || demoStories.english;
    return stories[Math.floor(Math.random() * stories.length)];
}

// API endpoint to generate story
app.post('/api/generate-story', async (req, res) => {
    try {
        const { prompt, language, model } = req.body;
        
        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        // Create language-specific prompt
        const languagePrompts = {
            english: `Write a creative and engaging story based on this prompt: "${prompt}". The story should be imaginative, well-structured, and approximately 800-1000 words long. Include vivid descriptions, character development, and an engaging plot.`,
            hindi: `इस संकेत के आधार पर एक रचनात्मक और दिलचस्प कहानी लिखें: "${prompt}"। कहानी कल्पनाशील, अच्छी तरह से संरचित और लगभग 800-1000 शब्दों की होनी चाहिए। इसमें जीवंत वर्णन, चरित्र विकास और एक आकर्षक कथानक शामिल करें।`,
            hinglish: `Is prompt ke basis par ek creative aur engaging story likhiye: "${prompt}". Story imaginative, well-structured aur approximately 800-1000 words ki honi chahiye. Hindi aur English words ka mix use kariye. Vivid descriptions, character development aur engaging plot include kariye।`
        };

        const fullPrompt = languagePrompts[language] || languagePrompts.english;

        let story = '';
        let apiError = null;

        // Handle different models
        if (model === 'demo') {
            story = getRandomDemoStory(language);
        } else if (model === 'openai-chatgpt') {
            try {
                if (!process.env.OPENAI_API_KEY) {
                    throw new Error('OpenAI API key not configured');
                }

                const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'user',
                            content: fullPrompt
                        }
                    ],
                    max_tokens: 1500,
                    temperature: 0.8
                }, {
                    headers: {
                        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000 // 10 second timeout
                });

                story = response.data.choices[0].message.content.trim();
            } catch (error) {
                console.error('OpenAI ChatGPT API Error:', error.response?.data || error.message);
                apiError = 'OpenAI ChatGPT API failed';
                story = getRandomDemoStory(language);
            }
        } else if (model === 'google-gemini') {
            try {
                if (!process.env.GEMINI_API_KEY) {
                    throw new Error('Gemini API key not configured');
                }
                // Free Tier: Gemini 2.0 Flash has a limit of 1,500 requests per day
                const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
                    contents: [{
                        parts: [{
                            text: fullPrompt
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.8,
                        maxOutputTokens: 1500
                    }
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 10000 // 10 second timeout
                });

                if (response.data.candidates && response.data.candidates[0] && response.data.candidates[0].content) {
                    story = response.data.candidates[0].content.parts[0].text.trim();
                } else {
                    throw new Error('Invalid response from Gemini API');
                }
            } catch (error) {
                console.error('Google Gemini API Error:', error.response?.data || error.message);
                apiError = 'Google Gemini API failed';
                story = getRandomDemoStory(language);
            }
        } else if (model === 'anthropic-claude') {
            try {
                if (!process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY === 'your_anthropic_api_key_here') {
                    throw new Error('Anthropic API key not configured');
                }

                if (!anthropic) {
                    throw new Error('Anthropic client not initialized');
                }

                const response = await anthropic.messages.create({
                    model: 'claude-3-haiku-20240307', // Using Claude 3 Haiku for cost efficiency
                    max_tokens: 1500,
                    temperature: 0.8,
                    messages: [
                        {
                            role: 'user',
                            content: fullPrompt
                        }
                    ]
                });

                if (response.content && response.content[0] && response.content[0].text) {
                    story = response.content[0].text.trim();
                } else {
                    throw new Error('Invalid response from Claude API');
                }
            } catch (error) {
                console.error('Anthropic Claude API Error:', error.message);
                apiError = 'Anthropic Claude API failed';
                story = getRandomDemoStory(language);
            }
        } else {
            return res.status(400).json({ error: 'Invalid model selected' });
        }

        // Prepare response
        const response = {
            prompt: prompt,
            story: story,
            language: language,
            model: model,
            timestamp: new Date().toISOString()
        };

        // If API failed but we have fallback, include error info
        if (apiError) {
            response.error = apiError;
            response.fallback = story;
        }

        res.json(response);

    } catch (error) {
        console.error('Error generating story:', error);
        
        // Provide fallback even for unexpected errors
        const fallbackStory = getRandomDemoStory(req.body.language || 'english');
        
        res.status(500).json({
            error: 'Story generation failed',
            fallback: fallbackStory,
            prompt: req.body.prompt,
            language: req.body.language || 'english',
            model: 'demo',
            timestamp: new Date().toISOString()
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        models: {
            demo: 'available',
            'openai-chatgpt': process.env.OPENAI_API_KEY ? 'configured' : 'not configured',
            'google-gemini': process.env.GEMINI_API_KEY ? 'configured' : 'not configured',
            'anthropic-claude': (process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY !== 'your_anthropic_api_key_here' && anthropic) ? 'configured' : 'not configured'
        }
    });
});

app.listen(PORT, () => {
    console.log(`🎭 KahaniKraftTales server is running on http://localhost:${PORT}`);
    console.log(`📚 Demo mode: Always available`);
    console.log(`🤖 OpenAI ChatGPT: ${process.env.OPENAI_API_KEY ? '✅ Configured' : '❌ Not configured'}`);
    console.log(`🔮 Google Gemini: ${process.env.GEMINI_API_KEY ? '✅ Configured' : '❌ Not configured'}`);
    console.log(`🧠 Anthropic Claude: ${(process.env.ANTHROPIC_API_KEY && process.env.ANTHROPIC_API_KEY !== 'your_anthropic_api_key_here' && anthropic) ? '✅ Configured' : '❌ Not configured'}`);
}); 
