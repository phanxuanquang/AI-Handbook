# Intergration Guidance

## 1.Set up project:

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
