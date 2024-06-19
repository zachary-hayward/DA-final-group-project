/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('plant_notes').del()
  await knex('plant_notes').insert([
    {id: 1, plot_plant_id: 1, date: '2024-03-16', note: 'Plant is growing well.' },
    {id: 2, plot_plant_id: 2, date: '2024-04-12', note: 'Leaves are green and healthy.' },
    {id: 3, plot_plant_id: 3, date: '2024-02-22', note: 'Showing signs of growth.' },
    {id: 4, plot_plant_id: 4, date: '2024-03-16', note: 'Plant is growing well.' },
    {id: 5, plot_plant_id: 5, date: '2024-04-12', note: 'Leaves are green and healthy.' },
    {id: 6, plot_plant_id: 6, date: '2024-02-22', note: 'Showing signs of growth.' },
    {id: 7, plot_plant_id: 7, date: '2024-03-16', note: 'Plant is growing well.' },
    {id: 8, plot_plant_id: 8, date: '2024-04-12', note: 'Leaves are green and healthy.' },
    {id: 9, plot_plant_id: 9, date: '2024-02-22', note: 'Showing signs of growth.' },
  ]);
};
