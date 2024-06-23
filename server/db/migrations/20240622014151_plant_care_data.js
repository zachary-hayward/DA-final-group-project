/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('plant_care_data', (table) => {
    table.increments('id').primary()
    table.string('plantName')
    table.string('scientificName')
    table.string('description')
    table.string('soil')
    table.string('sunlight')
    table.string('watering')
    table.string('fertilization')
    table.string('pruning')
    table.string('pests')
    table.string('diseases')
    table.string('indoorsPlantingTime')
    table.string('outdoorsPlantingTime')
    table.string('spacing')
    table.string('plantingTime')
    table.string('havestingTime')
    table.string('harvestingTips')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export const down = function (knex) {
  return knex.schema.dropTable('plant_care_data')
}
