/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const up = function (knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.integer('id').primary()
    table.string('type').notNullable()
    table
      .integer('plots_plants_id')
      .notNullable()
      .references('id')
      .inTable('plots_plants')
      .onDelete('CASCADE')
    table.integer('overdue_by')
    table.boolean('completed')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('tasks')
}
