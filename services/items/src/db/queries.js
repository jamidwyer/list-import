const knex = require('./connection');

function getSavedItems(itemId) {
  return knex('items').select().where('item_id', itemId);
}

function addItem(obj) {
  return knex('items').insert(obj);
}

module.exports = {
  getSavedItems,
  addItem,
};
