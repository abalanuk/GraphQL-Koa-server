const {GraphQLSchema, GraphQLString, GraphQLObjectType} = require('graphql')

//root query type is data graph is beginning and we can start to asking questions
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',

  fields: {
    hello: {
      type: GraphQLString,
      description: 'The *mandatory* hello world example',
      resolve: () => 'world'
    }
  }
})

const ncSchema = new GraphQLSchema({
  query: RootQueryType,
  //mutation: ...
})

module.exports = ncSchema