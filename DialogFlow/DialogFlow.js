const { SessionsClient } = require("@google-cloud/dialogflow").v2beta1;
const express = require("express");
const fs = require("fs");

const CREDENTIALS = JSON.parse(fs.readFileSync("service-account.json")); // Can be changed following the path of the "service-account.json" file
const PROJECT_ID = CREDENTIALS.project_id;
const CONFIGURATION = {
  credentials: {
    private_key: CREDENTIALS.private_key,
    client_email: CREDENTIALS.client_email,
  },
};

const sessionClient = new SessionsClient(CONFIGURATION);

const detectIntent = async (languageCode, question, sessionId) => {
  const sessionPath = sessionClient.projectAgentSessionPath(
    PROJECT_ID,
    sessionId
  );
  const request = {
    session: sessionPath,
    queryInput: { text: { text: question, languageCode } },
  };
  const [response] = await sessionClient.detectIntent(request);
  return {
    response: response.queryResult, // Can be changed following your need
  };
};

const chatbot = express();
chatbot.use(express.urlencoded({ extended: true }));
chatbot.use(express.json());

const PORT = process.env.PORT || 5000;

chatbot.listen(PORT, () => console.log(`Server is running at ${PORT}`));

chatbot.get("/", (_, res) => res.send(`Hello!`));

chatbot.post("/dialogflow", async (req, res) => {
  const {
    languageCode = "en", // Change following your project language, English should be prefered
    question = "Hello",
    sessionId = "Unecessary to be changed",
  } = req.body;
  const responseData = await detectIntent(languageCode, question, sessionId);
  res.send(responseData.response);
});
