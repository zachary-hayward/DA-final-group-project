/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('plots', (table) => {
    table.increments('id').primary()
    table.integer('garden_id').notNullable()
      .references('id').inTable('gardens').onDelete('CASCADE')
    table.integer('plot_number')
    table.integer('shade_level')
    table.integer('plot_type')
    table.integer('size')
    table.integer('average_wind')
    table.string('name')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('plots')
};
