
exports.up = function(knex) {
    return knex.schema.createTable('statuses', function (table) {
        table.bigIncrements('id').primary();
        table.string('status', 30).notNullable();
        table.timestamps(true, true)
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('statuses');
};
