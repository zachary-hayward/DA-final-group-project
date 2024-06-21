/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    { id:1, auth0_id: 'auth0|123', username: 'gardener_john', location: 'New York' },
    { id:2, auth0_id: 'auth0|456', username: 'plantlover_jane', location: 'California' },
    { id:3, auth0_id: 'auth0|789', username: 'green_thumb_joe', location: 'Texas' }
  ]);
  await knex('gardens').del()
  await knex('gardens').insert([
    {id: 1, user_id: 1, layout: 'Rectangular' },
    {id: 2, user_id: 2, layout: 'Square' },
    {id: 3, user_id: 3, layout: 'Circular' }
  ]);
  await knex('plants').del()
  await knex('plants').insert([
    {id: 1, name: 'Tomato', difficulty: 'Medium', planting_starts: 'March', planting_ends: 'April', watering_frequency: 'Daily', sun_level: 8, cycle: 'Annual' },
    {id: 2, name: 'Basil', difficulty: 'Easy', planting_starts: 'April', planting_ends: 'May', watering_frequency: 'Twice a week', sun_level: 6, cycle: 'Annual' },
    {id: 3, name: 'Carrot', difficulty: 'Hard', planting_starts: 'February', planting_ends: 'March', watering_frequency: 'Every other day', sun_level: 7, cycle: 'Biennial' }
  ]);
  await knex('user_desired_plants').del()
  await knex('user_desired_plants').insert([
    {id: 1, user_id: 1, plant_id: 1 },
    {id: 2, user_id: 1, plant_id: 2 },
    {id: 3, user_id: 1, plant_id: 3 },
    {id: 4, user_id: 2, plant_id: 1 },
    {id: 5, user_id: 2, plant_id: 2 },
    {id: 6, user_id: 2, plant_id: 3 },
    {id: 7, user_id: 3, plant_id: 1 },
    {id: 8, user_id: 3, plant_id: 2 },
    {id: 9, user_id: 3, plant_id: 3 },
  ]);
  await knex('plots').del()
  await knex('plots').insert([
    {id: 1, garden_id: 1, plot_number: 1, sun_level: 2, plot_type: 'Raised', size: '5x5' },
    {id: 2, garden_id: 1, plot_number: 2, sun_level: 3, plot_type: 'In-ground', size: '4x4'},
    {id: 3, garden_id: 1, plot_number: 3, sun_level: 1, plot_type: 'Container', size: '2x2'},
    {id: 4, garden_id: 2, plot_number: 1, sun_level: 2, plot_type: 'Raised', size: '5x5'},
    {id: 5, garden_id: 2, plot_number: 2, sun_level: 3, plot_type: 'In-ground', size: '4x4' },
    {id: 6, garden_id: 2, plot_number: 3, sun_level: 1, plot_type: 'Container', size: '2x2' },
    {id: 7, garden_id: 3, plot_number: 1, sun_level: 2, plot_type: 'Raised', size: '5x5' },
    {id: 8, garden_id: 3, plot_number: 2, sun_level: 3, plot_type: 'In-ground', size: '4x4' },
    {id: 9, garden_id: 3, plot_number: 3, sun_level: 1, plot_type: 'Container', size: '2x2' }
  ]);
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
  // await knex('plant_notes').del()
  // await knex('plant_notes').insert([
  //   {id: 1, plot_plant_id: 1, date: '2024-03-16', note: 'Plant is growing well.' },
  //   {id: 2, plot_plant_id: 2, date: '2024-04-12', note: 'Leaves are green and healthy.' },
  //   {id: 3, plot_plant_id: 3, date: '2024-02-22', note: 'Showing signs of growth.' },
  //   {id: 4, plot_plant_id: 4, date: '2024-03-16', note: 'Plant is growing well.' },
  //   {id: 5, plot_plant_id: 5, date: '2024-04-12', note: 'Leaves are green and healthy.' },
  //   {id: 6, plot_plant_id: 6, date: '2024-02-22', note: 'Showing signs of growth.' },
  //   {id: 7, plot_plant_id: 7, date: '2024-03-16', note: 'Plant is growing well.' },
  //   {id: 8, plot_plant_id: 8, date: '2024-04-12', note: 'Leaves are green and healthy.' },
  //   {id: 9, plot_plant_id: 9, date: '2024-02-22', note: 'Showing signs of growth.' },
  // ]);
  // await knex('images').del()
  // await knex('images').insert([
  //   {id: 1, plot_notes_id: 1, image: 'image1.jpg' },
  //   {id: 2, plot_notes_id: 2, image: 'image2.jpg' },
  //   {id: 3, plot_notes_id: 3, image: 'image3.jpg' }
  // ]);
};
