import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('classe_schedule', table => {
        table.increments('id').primary();

        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        table
            .integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onDelete('SET NULL')
            .onUpdate('CASCADE')
    })
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('classe_schedule');
}
