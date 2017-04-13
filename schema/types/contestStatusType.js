const {GraphQLEnumType} = require('graphql')

module.exports = new GraphQLEnumType({
  name: 'contestStatusType',
  //keys - it is like we'd like to represent status in GraphQL quires
  //values should exact as it is in DB
  values: {
    DRAFT: {value: 'draft'},
    PUBLISHED: {value: 'published'},
    ARCHIVED: {value: 'archived'},
  }
})