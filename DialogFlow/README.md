
# DialogFlow Intergration Guidance
![image](https://i.imgur.com/OLCbWGS.png)
Dialogflow is a platform that enables us to create chatbots without the need for installation, technical infrastructure, or even coding knowledge. It is a natural language understanding platform that makes it easy to design and integrate a conversational user interface into mobile apps, web applications, devices, bots, interactive voice response systems, and so on. 

Note: This integration guidance is used only for **version 2 beta 1** of DialogFlow API (latest version until 2023).
## 1. Set up project:

#### 1.1. Install Node.js and npm (skip if you had it already):
- [**Node.js**](https://nodejs.org/en/download/package-manager)
- [**npm**](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

#### 1.2. Install required packages:
```
nmp install @google-cloud/dialogflow express
```
#### 1.3. Create GCP service account and export it as a .JSON file:
- Detailed guidance can be found [HERE](https://cloud.google.com/iam/docs/service-accounts-create).

#### 1.4. Paste the content of your service account .JSON file into [*service-account.json*](https://github.com/phanxuanquang/AI-Handbook/blob/main/DialogFlow/service-account.json) file.

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
    "question" : "Hello!"
}
```

## 3. Documentaion:
- Can be found [**HERE**](https://www.npmjs.com/package/@google-cloud/dialogflow).
