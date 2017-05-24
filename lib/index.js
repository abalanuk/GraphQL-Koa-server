const koa = require('koa')
const mount = require('koa-mount')
const convert = require('koa-convert')
const graphqlHTTP = require('koa-graphql')
const debug = require('debug')('graphql:server')

const dataLoader = require('dataloader')
const pgPool = require('pg-pool')
const { MongoClient } = require('mongodb')
const assert = require('assert')

const { nodeEnv } = require('./util')
const pgConfig = require('../config/pg')[nodeEnv] //{database: 'contests'}
const mongoConfig = require('../config/mongo')[nodeEnv]
const schema = require('../schema')
const pgdbModule = require('../database/pgdb')
//const {graphql} = require('graphql')

const pgPoolObj = pgPool(pgConfig) //for getting data from Postgres DB
const pgdb = pgdbModule(pgPoolObj)
const GRAPHQL_PORT = 3000

const graphQLServer = new koa()
//read query from commandline
//const query = process.argv[2]
//graphql(ncSchema, query).then(res => console.log(res))

MongoClient.connect(mongoConfig.url, (err, mPool) => {
  assert.equal(err, null)

  const loaders = {
    usersByIds: new dataLoader(pgdb.getUsersByIds),
    usersByApiKeys: new dataLoader(pgdb.getUsersByApiKeys),
    contestsByUserIds: new dataLoader(pgdb.getContests),
    namesByContests: new dataLoader(pgdb.getNamesByContests)
  }
  graphQLServer.use(mount('/graphql', convert(graphqlHTTP({
        schema,
        graphiql: true,
        pretty: true,
        formatError: error => debug(error),
        context: { pgPoolObj, mPool, loaders }
      })
    ))
  )

  const PORT = process.env.PORT || GRAPHQL_PORT

  console.log(`Running in ${nodeEnv} mode...`)

  graphQLServer.listen(PORT, () =>
    console.log(`Listening on port ${PORT}`)
  )
})