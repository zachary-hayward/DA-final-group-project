/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('plots_plants', (table) => {
    table.increments('id').primary()
    table
      .integer('plant_id')
      .notNullable()
      .references('id')
      .inTable('plants')
      .onDelete('CASCADE')
    table
      .integer('plot_id')
      .notNullable()
      .references('id')
      .inTable('plots')
      .onDelete('CASCADE')
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
    table.string('date_planted')
    table.string('last_watered')
    table.string('watering_history')
    table.string('name')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('plots_plants')
}
