// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// dotenv.config();

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use((req, res, next) => {
//     console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//     next();
// });

// // Test Route
// app.post('/test', (req, res) => {
//     console.log('Test body:', req.body);
//     res.json({ received: req.body });
// });

// // Start Server
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Debug Logger
app.use((req, res, next) => {
    console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
    next();
});

// Test Route
app.post('/test', (req, res) => {
    console.log('Test body:', req.body);
    res.json({ received: req.body });
});

// OpenAI setup
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Quote Route
app.post('/api/quote', async (req, res) => {
    console.log('Received request body:', req.body);
    const { floor_type, square_footage, timeline, budget, client_name } = req.body;

    if (!floor_type || !square_footage || !timeline || !budget || !client_name) {
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
        const response = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
        });

        const quote = response.choices?.[0]?.message?.content?.trim();

        if (!quote) {
            return res.status(500).json({ error: 'Invalid response. No quote generated.' });
        }

        res.json({ quote });
    } catch (error) {
        console.error('OpenAI API error:', error.message);
        res.status(500).json({ error: 'Failed to generate quote' });
    }
});

// Health check route (optional)
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
