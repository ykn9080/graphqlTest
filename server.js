var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var cors = require('cors');
const { ApolloServer, gql } = require("apollo-server-express");
//import { ApolloServer, gql } from "apollo-server-express";
var schema = require('./graphql')
// const { resolvers } = require("./resolvers");
// const { typeDefs } = require("./typeDefs");
// import { resolvers } from "./resolvers";
// import { typeDefs } from "./typeDefs";

const startServer = async () => {


    app.use(cors())


    //app.use(cookieParser());
    //app.set('router', __dirname + '/router/main');
    // app.set('views', __dirname + '/views');
    // app.use(express.static(__dirname + '/public'));

    app.use(bodyParser.json({ limit: '50mb', extended: true }))
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

    const apServer = new ApolloServer({
        schema
    });

    apServer.applyMiddleware({ app });



    //Set up default mongoose connection
    const config = require('./config');
    //var mongoDB='mongodb://yknam:ykn9080@ds135399.mlab.com:35399/imcdb';
    await mongoose.connect(config.currentsetting.datasrc, { useNewUrlParser: true });
    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
    //Get the default connection
    var db = mongoose.connection;

    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));


    //require('./database/mssql.js');


    // var expressSession = require('express-session');
    // app.use(expressSession({
    //   secret: 'mySecretKey',
    //   resave: false,
    //   saveUninitialized: false
    // }));
    //  var passport = require('passport');
    // app.use(passport.initialize());
    // var initPassport = require('./passport/init');
    // initPassport(passport);
    // require('./router/index.js')(app,passport);


    app.set('port', process.env.PORT || 4001);
    var server = app.listen(app.get('port'), function() {
        console.log('Server is running on Port!!: ', server.address().port);
    });

};
startServer();