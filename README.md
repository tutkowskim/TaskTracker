# Todo Tracker
A simple task tracking application created created to explore building a serverless application using [Microsoft Azure's Static Website](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-websit) feature and practice React.

## Project Structure
1. `.github` - Github actions used to build, test, and deploy the application.
1. `backend` - Azure functions that provide the api calls for the static website.
1. `backend-mock` - A implementation of the backend, which mocks out the authentication and api calls so that we don't need to access Azure services.
1. `frontend-angular` - The frontend application written in Angular.
1. `frontend-react` - The frontend application written in React.

## Quick Start
1. Start the mock backend for local development
    1. Open a terminal window in the `backend-mock` directory
    1. Install dependencies with the command `npm install`
    1. Start the backend with the command `npm start`
1. Start the frontend for local development
    1. Open a terminal window in the frontend directory (`frontend-angular` or `frontend-react`)
    1. Install dependencies with the command `npm install`
    1. Start the frontend with the command `npm start`