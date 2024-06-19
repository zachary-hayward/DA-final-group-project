/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('plants').del()
  await knex('plants').insert([
    {id: 1, name: 'Tomato', difficulty: 'Medium', planting_starts: 'March', planting_ends: 'April', watering_frequency: 'Daily', sunlight: 8, cycle: 'Annual' },
    {id: 2, name: 'Basil', difficulty: 'Easy', planting_starts: 'April', planting_ends: 'May', watering_frequency: 'Twice a week', sunlight: 6, cycle: 'Annual' },
    {id: 3, name: 'Carrot', difficulty: 'Hard', planting_starts: 'February', planting_ends: 'March', watering_frequency: 'Every other day', sunlight: 7, cycle: 'Biennial' }
  ]);
};
