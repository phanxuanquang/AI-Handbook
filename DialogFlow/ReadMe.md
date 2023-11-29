
# DialogFlow Intergration Guidance
![image](https://i.imgur.com/OLCbWGS.png)
Dialogflow is a platform that enables us to create chatbots without the need for installation, technical infrastructure, or even coding knowledge. It is a natural language understanding platform that makes it easy to design and integrate a conversational user interface into mobile apps, web applications, devices, bots, interactive voice response systems, and so on. With Dialogflow, we can create new and engaging ways for users to interact with our product. Besides, Dialogflow can be integrated into many different platforms directly without extra coding. It is also easy to use and has a good natural language processing (NLP) system. 
## 1. Set up project:

#### 1.1. Install Node.js and npm (skip if you had already):
- Download and install Node.js on the [**official site**](https://nodejs.org/en/download/package-manager).
- Install npm:
```
npm install -g npm
```

#### 1.2. Install Dialogflow API client for Node.js and Express.js:
```
npm install @google-cloud/dialogflow express
```

#### 1.3. Create GCP service account and export it as a .JSON file:
- Detailed guidance can be found [HERE](https://cloud.google.com/iam/docs/service-accounts-create).
- 
#### 1.4. Parse the content of your service account .JSON file into [*service-account.json*](https://github.com/phanxuanquang/AI-Handbook/blob/main/DialogFlow/service-account.json) file.

## 2. Usage Guidance:

#### 2.1. Start Node.js server:
```
node DialogFlow.js
```

#### 2.2. API Usage:
```
POST http://localhost:5000/dialogflow
```
With request body (example):
```
{
    "queryText" : "Hello!"
}
```

## 3. Documentaion:
- Can be found [**HERE**](https://www.npmjs.com/package/@google-cloud/dialogflow).
