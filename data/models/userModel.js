const db = require('../dbConfig');

module.exports = {
  get,
  getById,
  getByUser,
  insert
}

function get() {
  return db('users').select('id', 'username', 'password');
}

function getById(id) {
  return db('users')
  .where('id', id)
}

function getByUser(user) {
  return db('users')
  .where('username', user)
}

function insert(user) {
  return db('users')
  .insert(user)
  .then( user => {
    return getById(user[0])
  })
}