# Simple websocket setup on Node/Express
see it live here: [hosted on heroku](https://basic-node-express-websocket.herokuapp.com/)

## Reqs

- notify when user dis/connects
- display list of users
- show timestamps 

## Basic Usage

You will need:

 - [Node.JS]
 - A Package Manager ([Yarn](https://yarnpkg.com/en/docs/getting-started) or [npm](https://docs.npmjs.com/getting-started/installing-node))

Open the folder in your terminal and run your package manager to install install the required packages and TypeScript declaration files:

```bash
# npm
npm install
npm start
navigate to localhost /in browser

# yarn
yarn start
navigate to localhost /in browser

# optional to recompile and restart server on file changes
npm run watch
or
yarn run watch
```

## Overview

- client submits a name to iniate a new websocket instance
- server is notified and sends id to client
- client sends back username with id 
- server saves the username to the client's socket connection and sends back a userslist msg type to ALL clients
- client renders userslist to screen to reflect connected users
- when client sends a message, server will add that socket's username to the msg data object before sending it to ALL clients

## TODO

- Handle duplicate usernames
- some UI stuff...lots of UI stuff
