const knex = require('./connection');

function getSavedItems(listId) {
  return knex('items').select().where('list_id', listId);
}

function addItems(obj) {
  return knex('items').insert(obj);
}

module.exports = {
  getSavedItems,
  addItems,
};
