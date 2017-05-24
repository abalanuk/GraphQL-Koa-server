const {GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLID} = require('graphql')

module.exports = new GraphQLObjectType({
  name: "storeType",
  fields: {
    _id: {type: GraphQLID},
    name: {type: new GraphQLNonNull(GraphQLString)},
    address: {type: GraphQLString},
    cityId: {type: GraphQLString}
  }
})