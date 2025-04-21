# 🧠 AI Quote Generator API

This is a simple API that takes user inputs (flooring type, square footage, etc.) and uses OpenAI's GPT-4 to generate a friendly, professional quote email for a contractor.

## Skills

- GPT integration
- Backend API
- Prompt engineering

## Use case

- Turn form inputs into a human-friendly quote using GPT-4
- In this case for a lumber company to use AI to return quotes


## 🚀 Features

- Takes structured form data
- GPT-4 prompt turns it into a human-readable quote
- Sends quote back as JSON
- Can plug into any website or frontend

## 🧰 Tech Stack

- Node.js / Express
- OpenAI API (GPT-4 or 3.5-turbo or other)
- dotenv for API key management

## 🛠 How to Use

1. Clone this repo
2. Run `npm install`
3. Copy `.env.example` to `.env` and add your OpenAI API key
4. Run the server:
   ```bash
   node server.js

## Prompt Example

You are a flooring contractor. Write a professional email quote based on:
- Flooring type: Engineered hardwood
- Square footage: 1,200 sqft
- Budget: $10–15k
- Timeline: Next 2–4 weeks
- Name: Sarah

Include:
- Rough cost range
- Summary of request
- Friendly closing

## JSON example

json post request /api/quote
{
  "floor_type": "Engineered hardwood",
  "square_footage": "1200",
  "timeline": "2–4 weeks",
  "budget": "$10–15k",
  "client_name": "Sarah"
}

example of response : 
{
  "quote": "Hi Sarah, thanks so much for reaching out about your engineered hardwood flooring..."
}

Long Json

{
    "floor_type": "Engineered hardwood",
    "square_footage": "1200",
    "timeline": "2–4 weeks",
    "budget": "$10–15k",
    "client_name": "Sarah"
}
{
    "floor_type": "Carpet",
    "square_footage": "800",
    "timeline": "1–2 weeks",
    "budget": "$5–8k",
    "client_name": "John"
}
{
    "floor_type": "Vinyl plank",
    "square_footage": "1500",
    "timeline": "2–3 weeks",
    "budget": "$7–12k",
    "client_name": "Emily"
}
{
    "floor_type": "Tile",
    "square_footage": "1000",
    "timeline": "3–5 weeks",
    "budget": "$8–14k",
    "client_name": "Michael"
}
{
    "floor_type": "Laminate",
    "square_footage": "900",
    "timeline": "1–3 weeks",
    "budget": "$4–9k",
    "client_name": "Jessica"
}
{
    "floor_type": "Bamboo",
    "square_footage": "1100",
    "timeline": "2–4 weeks",
    "budget": "$6–11k",
    "client_name": "David"
}