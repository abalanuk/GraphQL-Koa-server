module.exports = mPool => {
  return {
    getCounts(user, countField) {
      return mPool.collection('users')
       .findOne({ userId: user.id})
       .then(userCounts => userCounts[countField])
    }
  }

}