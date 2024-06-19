/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
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
};
