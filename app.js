var express = require('express')
var graphqlHTTP = require('express-graphql')
var Graphql = require('graphql')

var fakeDatabase = require('./fakedata.js')
var app = express();
var schema = require('./graphql')
var cors = require('cors');
app.use(cors())

// app.use(
//   "/graphql",
//   bodyParser.json(),
//   graphqlExpress({
//     schema,
//     tracing: true, // 모니터링을 위한 config
//     cacheControl: true // cache을 위한 config
//   })
// );

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}));

// GraphiQL 시각화를 위한 Endpoint
//app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.listen(4000);
console.log('running a graphql server')