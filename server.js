import express from 'express';
import cors from 'cors';
import OpenAIApi from 'openai';
import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI setup
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Routes
app.post('/api/quote', async (req, res) => {
    const { floor_type, square_footage, timeline, budget, client_name } = req.body;
    if(!floor_type || !square_footage || !timeline || !budget || !client_name) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const prompt = `
You are a professional assistant for a flooring contractor.

Write a friendly and professional email quote for a customer named ${client_name}, who requested:
- Flooring type: ${floor_type}
- Area: ${square_footage} sqft
- Timeline: ${timeline}
- Budget: ${budget}

Include:
- A brief summary of their request
- A rough price range estimate
- A closing that invites them to schedule a visit
`;

    try {
        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
        });
        if (!response.data.choices || response.data.choices[0].message) {
                    return res.status(500).json({ error: 'Invalid response No quote generated' });
                }
        const quote = response.data.choices[0].message.content.trim();
        res.json({ quote });
       
    } catch (error) {
        console.error('OpenAI API error:', error.message);
        res.status(500).json({ error: 'Failed to generate quote' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
