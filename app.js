var express = require('express')
var graphqlHTTP = require('express-graphql')
var Graphql = require('graphql')
var fakeDatabase = require('./fakedata.js')
var app = express();
var schema = require('./graphql')

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

app.listen(4000);
console.log('running a graphql server')