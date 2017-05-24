const {GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLList} = require('graphql')
const viewerType = require('./viewerType')
const cityList = require('../../database/cityList')
const cityType = require('./cityType')

module.exports = new GraphQLObjectType({
  name: 'Query',
  description: 'The root of all queries',
  fields: () => ({
    viewer: {
      type: viewerType,
      description: 'The current user identified by an api key',
      args: {
        key: {type: new GraphQLNonNull(GraphQLString)} //wrap primitive type to make it required
      },
      resolve: (obj, args, ctx) => { //obj for such root query is null but in fact it is parent object
        //Read user info from DB
        //using args.key as the api key
        //ctx.pgPool from context object passed into graphqlHTTP
        return ctx.loaders.usersByApiKeys.load(args.key)
      }
    },
    echo: {
      type: GraphQLString,
      description: "Simple field for testing purpose",
      args: {
        mes: {type: new GraphQLNonNull(GraphQLString), description: "Please pass a message"}
      },
      resolve: (root, args) => {
        return `Response: ${args.mes}`
      }
    },
    cities: {
      type: new GraphQLList(cityType),
      resolve: (obj, args, ctx) => {
        return cityList
      }
    }
  })
})