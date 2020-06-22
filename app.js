const express = require('express')
const bodyParser = require('body-parser')
const graphQlHttp = require('express-graphql')
const { buildSchema } = require('graphql');

const app = express();

app.use(bodyParser.json());

app.use('/api', graphQlHttp({
    schema: null,
    rootValue: {}
}));

app.listen(3000);