# Web Playground (codepen like app)

### Build Status:  [![Netlify Status](https://api.netlify.com/api/v1/badges/0c4011d3-557c-4ca4-aa80-f442e9f1d530/deploy-status)](https://app.netlify.com/sites/noppytinto-web-playground/deploys)

### Link: [visit website](https://noppytinto-web-playground.netlify.app)

<br/>

## Description:

Web Playground is a Codepen like website, that allow users to write HTML/CSS/JS code and see the result into the browser.
The code is delivered to the backend and then persisted in a local session. The backend is responsible for authorize the app to render the code and to manage sessions.
The communication between front and backend takes place through Rest API.

<br/>

## Stack:

- HTML, CSS (SASS)
- Javascript
(server)
- Node
- Express
- Postgres (session)

<br/>

## Technologies:

- Webpack
- Netlify
- Heroku
- JWT token
- Rest API
- Codemirror

<br/>

## Sequence Diagram (frontend-backend):

![sequence diagram frontend-backend](./md-assets/sequence-diagram.png)
