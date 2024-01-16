const express = require("express");
const fs = require("fs");
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI("YOUR_API_KEY");
const model = genAI.getGenerativeModel({ model: "gemini-pro" });
const loadContextFrom = (jsonPath) => {
  try {
    const historyData = fs.readFileSync(jsonPath, "utf8");
    const history = JSON.parse(historyData);
    return history;
  } catch (error) {
    console.error("Error reading context file: ", error);
    return [];
  }
};
function UpdateConversation(role, text, JsonArray) {
  const newElement = {
    role: role,
    parts: [
      {
        text: text,
      },
    ],
  };
  JsonArray.push(newElement);
  return JsonArray;
}

let context = loadContextFrom("context.json");
app.post("/gemini-pro", async (req, res) => {
  try {
    const { question } = req.body;

    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };

    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: context,
    });

    const result = await chat.sendMessage(question);
    const response = result.response;
    const text = response.text();
    context = UpdateConversation("user", text, chatLog);
    context = UpdateConversation("model", response.text(), chatLog);
    res.json({ answer: text });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
