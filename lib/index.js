const koa = require('koa')
const mount = require('koa-mount')
const convert = require('koa-convert');
const graphqlHTTP = require('koa-graphql')
const pgPool = require('pg-pool')
const { MongoClient } = require('mongodb')
const assert = require('assert')
const { nodeEnv } = require('./util')
const pgConfig = require('../config/pg')[nodeEnv] //{database: 'contests'}
const mongoConfig = require('../config/mongo')[nodeEnv]
const ncSchema = require('../schema')
//const {graphql} = require('graphql')

const pgPoolObj = pgPool(pgConfig) //for getting data from Postgres DB

const App = new koa()
//read query from commandline
//const query = process.argv[2]
//graphql(ncSchema, query).then(res => console.log(res))

MongoClient.connect(mongoConfig.url, (err, mPool) => {
  assert.equal(err, null)

  App.use(mount('/graphql', convert(graphqlHTTP({
    schema: ncSchema,
    graphiql: true,
    context: { pgPoolObj, mPool }
  }))))

  const PORT = process.env.PORT || 3000

  console.log(`Running in ${nodeEnv} mode...`)
  //console.log(mPool)
  App.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })

})