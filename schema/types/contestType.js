const {GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLID, GraphQLList} = require('graphql')
const contestStatusType = require('./contestStatusType')
const nameType = require('./nameType')
const pgdb = require('../../database/pgdb')

module.exports = new GraphQLObjectType({
  name: 'contestType',

  fields: {
    id: {type: GraphQLID},
    code: {type: new GraphQLNonNull(GraphQLString)},
    title: {type: new GraphQLNonNull(GraphQLString)},
    description: {type: GraphQLString},
    status: {type: new GraphQLNonNull(contestStatusType)},
    createdAt: {type: new GraphQLNonNull(GraphQLString)},
    names: {
      type: new GraphQLList(nameType),
      resolve(obj, args, ctx) {
        return pgdb(ctx.pgPoolObj).getNamesByContest(obj.id)
      }
    }
  }
})