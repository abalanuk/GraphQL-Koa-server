const humps = require('humps')
const _ = require('lodash')

module.exports = pgPool => {

  const orderFor = (resRows, keysArr, keyField, isSingleObject) => {
    const data = humps.camelizeKeys(resRows)
    const dataGroupedByField = _.groupBy(data, keyField)
    return keysArr.map(key => {
      const elementArray = dataGroupedByField[key]
      if(elementArray) {
        return isSingleObject ? elementArray[0] : elementArray
      }
      return isSingleObject ? {} : []
    })
  }

  return {
    getUsersByApiKeys(apiKeys) {
      return pgPool.query(`select * from users where api_key = ANY($1)`, [apiKeys])
      .then(res => {
        return orderFor(res.rows, apiKeys, 'apiKey', true)
      })
    },
    getUsersByIds(userIDs) {
      return pgPool.query(`select * from users where id = ANY($1)`, [userIDs])
      .then(res => {
        return orderFor(res.rows, userIDs, 'id', true)
      })
    },
    getContests(userIds) {
      return pgPool.query(`select * from contests where created_by = ANY($1)`, [userIds])
      .then(res => {
        return orderFor(res.rows, userIds, 'createdBy', false)
      })
    },
    getNamesByContests(contestIds) {
      return pgPool.query(`select * from names where contest_id = ANY($1)`, [contestIds])
      .then(res => {
        return orderFor(res.rows, contestIds, 'contestId', false)
      })
    }
  }
}