const {GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLID} = require('graphql')
const pgdb = require('../../database/pgdb')

module.exports = new GraphQLObjectType({
  name: 'nameType',

  fields: () => {
    const userType = require('./userType')

    return {
      id: {type: GraphQLID},
      label: {type: new GraphQLNonNull(GraphQLString)},
      description: {type: GraphQLString},
      createdBy: {
        type: new GraphQLNonNull(userType),
        resolve(obj, args, ctx) {
          return pgdb(ctx.pgPoolObj).getUserById(obj.createdBy)
        }
      }
    }
  }
})