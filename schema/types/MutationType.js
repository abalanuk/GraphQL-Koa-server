const {GraphQLString, GraphQLNonNull, GraphQLObjectType} = require('graphql')
const cityType = require('./cityType')
const cityList = require('../../database/cityList')

module.exports = new GraphQLObjectType({
  name: 'MutationType',
  description: 'Mutation for creating new store',
  fields: () => ({
    createPost: {
      type: cityType,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: (source, args) => {
        let city = Object.assign({}, args)
        city._id = `${Date.now()}::${Math.ceil(Math.random() * 9999999)}`

        cityList.push(city)

        return city
      }
    }
  })
})