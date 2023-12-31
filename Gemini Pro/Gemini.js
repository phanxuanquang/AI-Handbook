const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const prompt = "Hello!"; // Replace with your prompt if any. This prompt is to tell the bot about the context or the role it must take

app.post('/gemini-pro', async (req, res) => {
  try {
    const { question } = req.body;

    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: prompt,
        },
        {
          role: 'model',
          parts: 'Hello, how can I help you?', 
        },
      ],
      generationConfig: {
        maxOutputTokens: 150,
      },
    });

    const result = await chat.sendMessage(question);
    const response = await result.response;
    const text = response.text();

    res.json({ answer: text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
