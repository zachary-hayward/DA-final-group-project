/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('plants', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('difficulty')
    table.string('planting_starts')
    table.string('planting_ends')
    table.string('watering_frequency')
    table.integer('sunlight')
    table.string('cycle')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('plants')
};
