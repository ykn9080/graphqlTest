var Graphql = require("graphql");
var { makeExecutableSchema } = require("graphql-tools");
var fakeDatabase = require("../fakedata.js");
const typeDefs = `
type geo{
  lat:Float,
  lng:Float
}
type company{
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
type user{
  id:Int
  name:String
  username:String
  email:String
  address:address
  phone:String
  website:String
  company:company
}
type Query{
  user(id:Int!):user
  allUser:[user]
}
`;

const resolvers = {
    Query: {
        user(_, { id }) {
            const data = Object.keys(fakeDatabase).filter(element => {
                if (fakeDatabase[element].id == id) {
                    return element;
                }
            });
            return fakeDatabase[data];
        },
        allUser() {
            return fakeDatabase;
        }
    }
};



// const geoType = new Graphql.GraphQLObjectType({ // Object 타입을 정의합니다.
//     name: "geo",
//     fields: {
//         lat: { type: Graphql.GraphQLFloat },
//         lng: { type: Graphql.GraphQLFloat }
//     }
// });
// const companyType = new Graphql.GraphQLObjectType({
//     name: "company",
//     fields: {
//         name: { type: Graphql.GraphQLString },
//         catchPhrase: { type: Graphql.GraphQLString },
//         bs: { type: Graphql.GraphQLString }
//     }
// });
// const addressType = new Graphql.GraphQLObjectType({
//     name: "address",
//     fields: {
//         street: { type: Graphql.GraphQLString },
//         suite: { type: Graphql.GraphQLString },
//         city: { type: Graphql.GraphQLString },
//         zipcode: { type: Graphql.GraphQLString },
//         geo: { type: geoType } // Object 형태일 경우 새로 GrapgQLObject를 만들어서 지정해 줍니다.
//     }
// });
// const userType = new Graphql.GraphQLObjectType({
//     name: "User",
//     fields: {
//         id: { type: Graphql.GraphQLInt },
//         name: { type: Graphql.GraphQLString },
//         username: { type: Graphql.GraphQLString },
//         email: { type: Graphql.GraphQLString },
//         address: { type: addressType }, // Object 형태일 경우 새로 GrapgQLObject를 만들어서 지정해 줍니다.
//         phone: { type: Graphql.GraphQLString },
//         website: { type: Graphql.GraphQLString },
//         company: { type: companyType } // Object 형태일 경우 새로 GrapgQLObject를 만들어서 지정해 줍니다.
//     }
// });
// var queryType = new Graphql.GraphQLObjectType({
//     name: "Query",
//     fields: {
//         user: {
//             type: userType,
//             args: { // 쿼리문 중 인자를 정의하는 곳
//                 id: { type: Graphql.GraphQLInt }
//             },
//             resolve: function(obj, { id }, ctx, b) { // 실제로 쿼리 될때 호출되는 메소드
//                 const data = Object.keys(fakeDatabase).filter(element => {
//                     if (fakeDatabase[element].id == id) {
//                         return element;
//                     }
//                 });
//                 return fakeDatabase[data];
//             }
//         },
//         allUser: {
//             type: new Graphql.GraphQLList(userType),
//             resolve: function(obj, args, ctx, _) {
//                 return fakeDatabase;
//             }
//         }
//     }
// });

//var schema = new Graphql.GraphQLSchema({ query: queryType });
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})
module.exports = schema