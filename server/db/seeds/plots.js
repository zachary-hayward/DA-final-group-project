/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('plots').del()
  await knex('plots').insert([
    {id: 1, garden_id: 1, plot_number: 1, shade_level: 2, plot_type: 'Raised', size: '5x5', average_wind: 'Low' },
    {id: 2, garden_id: 1, plot_number: 2, shade_level: 3, plot_type: 'In-ground', size: '4x4', average_wind: 'Medium' },
    {id: 3, garden_id: 1, plot_number: 3, shade_level: 1, plot_type: 'Container', size: '2x2', average_wind: 'High' },
    {id: 4, garden_id: 2, plot_number: 1, shade_level: 2, plot_type: 'Raised', size: '5x5', average_wind: 'Low' },
    {id: 5, garden_id: 2, plot_number: 2, shade_level: 3, plot_type: 'In-ground', size: '4x4', average_wind: 'Medium' },
    {id: 6, garden_id: 2, plot_number: 3, shade_level: 1, plot_type: 'Container', size: '2x2', average_wind: 'High' },
    {id: 7, garden_id: 3, plot_number: 1, shade_level: 2, plot_type: 'Raised', size: '5x5', average_wind: 'Low' },
    {id: 8, garden_id: 3, plot_number: 2, shade_level: 3, plot_type: 'In-ground', size: '4x4', average_wind: 'Medium' },
    {id: 9, garden_id: 3, plot_number: 3, shade_level: 1, plot_type: 'Container', size: '2x2', average_wind: 'High' }
  ]);
};
