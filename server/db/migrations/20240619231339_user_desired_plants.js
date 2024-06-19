/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function(knex) {
  return knex.schema.createTable('user_desired_plants', (table) => {
    table.increments('id').primary()
    table.integer('user_id').notNullable()
      .references('id').inTable('users').onDelete('CASCADE')
    table.integer('plant_id').notNullable()
      .references('id').inTable('plants').onDelete('CASCADE')
  })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function(knex) {
  return knex.schema.dropTable('user_desired_plants')
};
