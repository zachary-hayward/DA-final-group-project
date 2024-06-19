/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('plant_notes', (table) => {
    table.increments('id').primary()
    table.integer('plot_plant_id').notNullable()
      .references('id').inTable('plot_plant').onDelete('CASCADE')
    table.string('date')
    table.string('note')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('plant_notes')
};
