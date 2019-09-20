exports.up = (knex) => {
  return knex.schema.createTable('lists', (table) => {
    table.increments();
    table.integer('user_id').notNullable();
    table.string('title').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('lists');
};
