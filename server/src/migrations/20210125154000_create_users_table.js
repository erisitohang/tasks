exports.up = function (knex) {
    return knex.schema.createTable('users', function (table) {
      table.bigIncrements('id').primary();
      table.string('name', 50).notNullable();
      table.string('email', 50).notNullable();
      table.string('password', 60).notNullable();
      table.timestamps(true, true)
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users');
  };
  