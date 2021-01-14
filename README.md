# Todo Tracker
A simple task tracking application created created to explore building a serverless appliction using Auth0, Azure Functions, and CosmosDB with React and iOS clients.

# Quick Start
1. Setup Database
  1. Create a CosmosDB using azure or the emulator with a 'Tasks' container
2. Create a `.local.settings.json` file in the backend folder with your devloper settigns
    ```json
    {
      "IsEncrypted": false,
      "Values": {
        "FUNCTIONS_WORKER_RUNTIME": "node",
        "AzureWebJobsStorage": "",
        "COSMOSDB_ENDPOINT": "<Database URI>",
        "COSMOSDB_KEY": "<Database Key>",
        "COSMOSDB_DATABASE_ID": "<Database ID>",
        "COSMOSDB_CONTAINER_ID": "<Database Container>"
      }
    }
    ```
2. Start the backend
    1. Open a new terminal in the backend folder: `cd backend`
    2. Run npm install: `npm install`
    3. Start the backend: `npm start`
3. Start the frontend
    1. Open a new terminal in the frontend-react folder: `cd frontend-react`
    2. Run npm install: `npm install`
    3. Start the react dev server: `npm start`
