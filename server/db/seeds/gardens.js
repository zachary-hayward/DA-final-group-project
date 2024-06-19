/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('gardens').del()
  await knex('gardens').insert([
    {id: 1, user_id: 1, layout: 'Rectangular' },
    {id: 2, user_id: 2, layout: 'Square' },
    {id: 3, user_id: 3, layout: 'Circular' }
  ]);
};
