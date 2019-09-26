const bcrypt = require('bcryptjs');

exports.seed = (knex) => {
  return knex('users').del()
    .then(() => {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync('herman', salt);
      knex('users').insert({
        username: 'michael',
        password: hash,
      }) // eslint-disable-line
    })
    .catch((err) => { console.log(err); }); // eslint-disable-line
};
