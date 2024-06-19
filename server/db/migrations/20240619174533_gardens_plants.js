/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('gardens_plants', (table) => {
    table.increments('id').primary()
    table.integer('plant_id').notNullable()
      .references('id').inTable('plants').onDelete('CASCADE')
    table.integer('garden_id').notNullable()
      .references('id').inTable('gardens').onDelete('CASCADE')
    table.integer('plot_number')
  })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('gardens_plants')
};
