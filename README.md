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

## 🛠 Problems

- I had hours of problems trying to get postman to work
- I don't know the problem postman has but it never worked.
- I eventually tried curl and hoppscotch
- Both of those worked with no problems.



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
