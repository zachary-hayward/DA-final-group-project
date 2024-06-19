/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('images', (table) => {
    table.increments('id').primary()
    table.integer('plot_notes_id').notNullable()
      .references('id').inTable('plot_notes').onDelete('CASCADE')
    table.string('image')
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('images')
};
