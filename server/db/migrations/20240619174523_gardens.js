/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('gardens', (table) => {
    table.increments('id').primary()
    table.integer('user_id').notNullable()
      .references('id').inTable('users').onDelete('CASCADE')
    table.string('layout')
  })  
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('gardens')
}
