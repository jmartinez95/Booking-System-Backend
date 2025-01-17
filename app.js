const express = require('express')
const bodyParser = require('body-parser')
const graphQlHttp = require('express-graphql')
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth')

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use(isAuth);

app.use('/api', graphQlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ipwcs.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`).then(() => {
    app.listen(port);
}).catch(err => {
    console.log(err);
})

