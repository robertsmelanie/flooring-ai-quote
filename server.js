import express from 'express';
// require('dotenv').config();
// const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

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
