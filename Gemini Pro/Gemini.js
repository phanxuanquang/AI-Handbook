const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(atob('QUl6YVN5RFR4dkpFZEhNRzVhOGI5ejhTQ3V1czRqZ25MOTFfeWk0'));
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

const prompt = "Hello!"; // Replace with your prompt if any. This prompt is to tell the bot about the context or the role it must take

function removeMarkdownFrom(text) {
  text = text.replace(/\*\*(.*?)\*\*/g, '$1');
  text = text.replace(/\*(.*?)\*/g, '$1');
  text = text.replace(/`(.*?)`/g, '$1');
  text = text.replace(/^#+\s*(.*)/gm, '$1');
  text = text.replace(/^\s*-\s*(.*)/gm, '$1');
  text = text.replace(/^\s*\d+\.\s*(.*)/gm, '$1');
  text = text.replace(/^\s*>\s*(.*)/gm, '$1');

  return text;
}

app.post('/gemini', async (req, res) => {
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
        maxOutputTokens: 400,
      },
    });

    const result = await chat.sendMessage(question);
    const response = await result.answer;
    const text = response.text();

    var answerAfterFormating = removeMarkdownFrom(text);
    res.json({ answer: answerAfterFormating });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
