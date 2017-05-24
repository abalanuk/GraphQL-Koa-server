const {GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLObjectType, GraphQLID, GraphQLList} = require('graphql')
const {globalIdField} = require('graphql-relay')
const ContestType = require('./contestType')
const mgdb = require('../../database/mgdb')

module.exports = new GraphQLObjectType({
  name: "viewerNode",
  description: "This represent a current session's user",
  fields: {
    id: globalIdField('Viewer'),
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    fullName: {
      type: GraphQLString,
      resolve: obj => `${obj.firstName} ${obj.lastName}`
    },
    email: { type: new GraphQLNonNull(GraphQLString) },
    contests: {
      type: new GraphQLList(ContestType),
      resolve(obj, args, ctx) {
        return ctx.loaders.contestsByUserIds.load(obj.id)
      }
    },
    contestsCount: {
      type: GraphQLInt,
      resolve(obj, args, ctx, { fieldName }) {
        return mgdb(ctx.mPool).getCounts(obj, fieldName)
      }
    },
    namesCount: {
      type: GraphQLInt,
      resolve(obj, args, ctx, { fieldName }) {
        return mgdb(ctx.mPool).getCounts(obj, fieldName)
      }
    },
    votesCount: {
      type: GraphQLInt,
      resolve(obj, args, ctx, { fieldName }) {
        return mgdb(ctx.mPool).getCounts(obj, fieldName)
      }
    }
  }
})
//
//fragment UserCounts on  {
//  type: GraphQLInt,
//  resolve(obj, args, ctx, { fieldName }) {
//    return mgdb(ctx.mPool).getCounts(obj, fieldName)
//  }
//}