const { GraphQLSchema } = require('graphql')
//const {fromGlobalId, nodeDefinitions, globalIdField} = require('graphql-relay')
const QueryType = require('./types/QueryType')
const MutationType = require('./types/MutationType')

//root query type is data graph is beginning and we can start to asking questions
const Schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType

})

module.exports = Schema