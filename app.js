const express = require('express')
const bodyParser = require('body-parser')
const graphQlHttp = require('express-graphql')
const mongoose = require('mongoose');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());



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

