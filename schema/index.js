const {GraphQLSchema, GraphQLString, GraphQLObjectType, GraphQLNonNull} = require('graphql')
const userType = require('./types/userType')
const pgdb = require('../database/pgdb')

//root query type is data graph is beginning and we can start to asking questions
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',

  fields: {
    me: {
      type: userType,
      description: 'The current user identified by an api key',
      args: {
        key: {type: new GraphQLNonNull(GraphQLString)} //wrap primitive type to make it required
      },
      resolve: (obj, args, ctx) => { //obj for such root query is null but in fact it is parent object
        //Read user info from DB
        //using args.key as the api key
        //ctx.pgPool from context object passed into graphqlHTTP
        return pgdb(ctx.pgPoolObj).getUserByApiKey(args.key)

        //return {
        //  id: 42,
        //  email: 'balanuk@gmail.com'
        //}
      }
    }
  }
})

const ncSchema = new GraphQLSchema({
  query: RootQueryType,
  //mutation: ...
})

module.exports = ncSchema