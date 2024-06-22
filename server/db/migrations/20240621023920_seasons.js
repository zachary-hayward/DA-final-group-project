/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('seasons', (table) => {
    table.increments('id').primary()
    table
      .integer('plant_id')
      .notNullable()
      .references('id')
      .inTable('plants')
      .onDelete('CASCADE')
    table.string('season')
    table.string('month')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('seasons')
}
