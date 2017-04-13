const humps = require('humps')

module.exports = pgPool => {
  return {
    getUserByApiKey(apiKey) {
      return pgPool.query(`select * from users where api_key = $1`, [apiKey])
      .then(res => humps.camelizeKeys(res.rows[0]))
    },
    getContests(userId) {
      return pgPool.query(`select * from contests where created_by = $1`, [userId])
      .then(res => humps.camelizeKeys(res.rows))
    },
    getNamesByContest(contestId) {
      return pgPool.query(`select * from names where contest_id = $1`, [contestId])
      .then(res => humps.camelizeKeys(res.rows))
    },
    getUserById(userID) {
      return pgPool.query(`select * from users where id = $1`, [userID])
      .then(res => humps.camelizeKeys(res.rows[0]))
    }
  }
}