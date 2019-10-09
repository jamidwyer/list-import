exports.seed = (knex) => {
  return knex('items').del()
    .then(() => {
      knex('items').insert({
        item_id: 1,
        list_id: 1,
        list_name: 'groceries',
        user_id: 1,
        title: 'milk',
      })  // eslint-disable-line
    })
    .catch((err) => { console.log(err); }); // eslint-disable-line
};
