const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(atob('QUl6YVN5RFR4dkpFZEhNRzVhOGI5ejhTQ3V1czRqZ25MOTFfeWk0'));
const app = express();

app.use(express.json());

app.post("/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question not found." });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(question);
    res.json({ answer: result.response.text() });
  } catch (error) {
    res.status(500).json({ error: "An error occurred while generating content." });
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});