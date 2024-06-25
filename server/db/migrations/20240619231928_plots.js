/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('plots', (table) => {
    table.increments('id').primary()
    table
      .integer('garden_id')
      .notNullable()
      .references('id')
      .inTable('gardens')
      .onDelete('CASCADE')
    table.integer('plot_number')
    table.string('sun_level')
    table.boolean('growable')
    table.string('plot_type')
    table.integer('size')
    table.string('name')
    table.string('rain_exposure')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('plots')
}
