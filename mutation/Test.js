const {GraphQLString, GraphQLNonNull} = require('graphql')
const { mutationWithClientMutationId } = require('graphql-relay')
const cityType = require('./cityType')
const cityList = require('../../database/cityList')

module.exports = mutationWithClientMutationId({
  name: 'StoreMutation',
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