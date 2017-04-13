const {GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLObjectType, GraphQLID, GraphQLList} = require('graphql')
const ContestType = require('./contestType')
const pgdb = require('../../database/pgdb')
const mgdb = require('../../database/mgdb')

module.exports = new GraphQLObjectType({
  name: "userType",

  fields: {
    id: { type: GraphQLID },
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
        return pgdb(ctx.pgPoolObj).getContests(obj.id)
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