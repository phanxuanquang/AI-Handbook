# Gemini Pro Intergration Guidance

![image](https://i.imgur.com/zgSTNZr.jpeg)
Gemini Pro is a powerful large language model (LLM) from Google AI, designed for diverse tasks and real-world applications. It boasts impressive capabilities in text generation, translation, code, and even image creation, making it a versatile tool for developers and businesses.

## 1. Set up project:

#### 1.1. Install Node.js and npm (skip if you had it already):

- [**Node.js**](https://nodejs.org/en/download/package-manager)
- [**npm**](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### 1.2. Install required packages:

```
npm install @google/generative-ai express body-parser node-fetch
```

## 2. Usage Guidance:

#### 2.1. Get the API key:

Get the APY key [**HERE**](https://makersuite.google.com/app/apikey), then replace _YOUR_API_KEY_ with you key.

#### 2.2. Start Node.js server:

```
node Gemini.js
```

#### Prompt (Optional):

Input the prompt to tell the chatbot about the context or the role to take in order to improve the accuracy of the response.

#### 2.3. API Usage:

```
POST http://localhost:5000/gemini-pro-vision
```

With request body (example):

```json
{
    "question" : "Hello!",
    "imageUrl" : "https://i.imgur.com/aQYdqzj.jpg"
}
```

## 3. Documentaion:

- Can be found [**HERE**](https://ai.google.dev/docs).
