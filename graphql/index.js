var Graphql = require("graphql");
var { makeExecutableSchema } = require("graphql-tools");
var fakeDatabase = require("../fakedata.js");
//var { company, menu, control, accessGroup } = require("../model/models");
var company = require("../model/models")["Company"];
var menu = require("../model/models")["Menu"];
var user = require("../model/models")["User"];
const typeDefs = `
type company{
  _id:ID!,
   id: String,
    name: String,
    language: String,
    module: String
}
type user{
  _id:ID!,
  id:String,
  password:String!,
  email: String!,
  name: String!,
  group: String,
  comp: company
}
type menu{
  _id:ID!,
   id: String,
    pid: String
}
type geo{
  lat:Float,
  lng:Float
}
type company1{
  name:String
  catchPhrase:String
  bs:String
}
type address{
  street:String
  suite:String
  city:String
  zipcode:String
  geo:geo
}
type user1{
  id:Int
  name:String
  username:String
  email:String
  address:address
  phone:String
  website:String
  company1:company1
}
type Query{
  user1(id:Int!):user1
  allUser:[user1]
  companies:[company]
  users:[user]
  getuser(_id:ID!):user
  getmenu(_id:ID!):menu
  menues:[menu]
}
 input MenuInput {
        id: String!
    }

    type Mutation {
        createMenu(input: MenuInput): menu
    }

`;

const resolvers = {
    Query: {
        user1(_, { id }) {
            const data = Object.keys(fakeDatabase).filter(element => {
                if (fakeDatabase[element].id == id) {
                    return element;
                }
            });
            return fakeDatabase[data];
        },
        allUser() {
            return fakeDatabase;
        },
        companies() {
            return company.find({});
        },
        users() {
            user.find({}).populate("comp").exec((err,usr)=>{
              return usr;
            });
        },
        async getuser(parent, { _id }) {
           //return await user.findById(_id);
             await user.findById(_id).populate("comp").exec((err,usr)=>{
               return usr;
             });
        },
        async getmenu(parent, { _id }) {
            //return find(user, { id: id });
            return await menu.findById(_id);
        },
        async menues() {
            //return find(user, { id: id });
            return await menu.find({});
        }
    },
    Mutation: {
        async createMenu(root, { input }) {
            return await menu.create(input);
        }
    } // new
};

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})
module.exports = schema