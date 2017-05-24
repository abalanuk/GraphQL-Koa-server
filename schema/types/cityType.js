const {GraphQLNonNull, GraphQLString, GraphQLObjectType, GraphQLID, GraphQLList} = require('graphql')
const storeType = require('./storeType')
const Stores = require('../../database/stores')

module.exports = new GraphQLObjectType({
  name: "cityType",
  description: "Representation of CityNode",
  fields: {
    _id: { type: GraphQLID },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      resolve: (city, args) => {
        return city.name || "Name is not defined"
      }
    },
    stores: {
      type: new GraphQLList(storeType),
      resolve: (obj, args) => {
        //console.log(Stores.filter(store => store.cityId === obj._id))
        return Stores.filter(store => store.cityId === obj._id)
      }
    }
  }
})