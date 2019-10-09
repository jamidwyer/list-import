const knex = require('./connection');

function getSavedLists(userId) {
  const lists = knex('lists').select().where('user_id', userId);
  return lists;
}

function addList(obj) {
  return knex('lists').insert(obj);
}

module.exports = {
  getSavedLists,
  addList,
};
