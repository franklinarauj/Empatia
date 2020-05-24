exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table) {
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('condominio_id').notNullable();

        table.foreign('condominio_id').references('id').inTable('condominios');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');   
};
