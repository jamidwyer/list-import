exports.up = (knex) => {
  return knex.schema.createTable('items', (table) => {
    table.increments('item_id');
    table.integer('list_id').notNullable();
    table.string('list_name');
    table.integer('user_id').notNullable();
    table.string('title').notNullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable('items');
};
