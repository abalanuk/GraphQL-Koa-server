const koa = require('koa')
const mount = require('koa-mount')
const convert = require('koa-convert');
const graphqlHTTP = require('koa-graphql')
const ncSchema = require('../schema')
const { nodeEnv } = require('./util')
//const {graphql} = require('graphql')

const App = new koa()
//read query from commandline
//const query = process.argv[2]
//graphql(ncSchema, query).then(res => console.log(res))

App.use(mount('/graphql', convert(graphqlHTTP({
  schema: ncSchema,
  graphiql: true
}))))

const PORT = process.env.PORT || 3000

console.log(`Running in ${nodeEnv} mode...`)
App.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})