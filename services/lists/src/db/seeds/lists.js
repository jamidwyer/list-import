exports.seed = (knex) => {
  return knex('lists').del()
    .then(() => {
      knex('lists').insert({
        user_id: 1,
        list_id: 1,
        title: 'groceries',
      })  // eslint-disable-line
    })
    .catch((err) => { console.log(err); }); // eslint-disable-line
};
