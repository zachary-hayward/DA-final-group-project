/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('plots_plants').del()
  await knex('plots_plants').insert([
    {id: 1, plant_id: 1, plot_id: 1, date_planted: '2024-03-01', last_watered: '2024-03-15' },
    {id: 2, plant_id: 2, plot_id: 2, date_planted: '2024-04-01', last_watered: '2024-04-10' },
    {id: 3, plant_id: 3, plot_id: 3, date_planted: '2024-02-15', last_watered: '2024-02-20' },
    {id: 4, plant_id: 1, plot_id: 4, date_planted: '2024-03-01', last_watered: '2024-03-15' },
    {id: 5, plant_id: 2, plot_id: 5, date_planted: '2024-04-01', last_watered: '2024-04-10' },
    {id: 6, plant_id: 3, plot_id: 6, date_planted: '2024-02-15', last_watered: '2024-02-20' },
    {id: 7, plant_id: 1, plot_id: 7, date_planted: '2024-03-01', last_watered: '2024-03-15' },
    {id: 8, plant_id: 2, plot_id: 8, date_planted: '2024-04-01', last_watered: '2024-04-10' },
    {id: 9, plant_id: 3, plot_id: 9, date_planted: '2024-02-15', last_watered: '2024-02-20' },
  ]);
};
