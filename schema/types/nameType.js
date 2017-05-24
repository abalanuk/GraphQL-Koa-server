const {GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLID} = require('graphql')

module.exports = new GraphQLObjectType({
  name: 'nameType',

  fields: () => {
    const userType = require('./viewerType')

    return {
      id: {type: GraphQLID},
      label: {type: new GraphQLNonNull(GraphQLString)},
      description: {type: GraphQLString},
      createdBy: {
        type: new GraphQLNonNull(userType),
        resolve(obj, args, ctx) { //ctx can be substituted by { loaders }
          return ctx.loaders.usersByIds.load(obj.createdBy)
        }
      }
    }
  }
})