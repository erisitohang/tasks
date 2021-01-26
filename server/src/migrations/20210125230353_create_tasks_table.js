
exports.up = function(knex) {
    return knex.schema.createTable('tasks', function (table) {
        table.bigIncrements('id').primary();
        table.bigInteger('user_id').unsigned().notNullable();
        table.bigInteger('status_id').unsigned().notNullable();
        table.text('description').notNullable();
        table.bigInteger('order').notNullable().defaultTo(0);
        table.timestamps(true, true)
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tasks');
};
