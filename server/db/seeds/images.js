/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('images').del()
  await knex('images').insert([
    {id: 1, plot_notes_id: 1, image: 'image1.jpg' },
    {id: 2, plot_notes_id: 2, image: 'image2.jpg' },
    {id: 3, plot_notes_id: 3, image: 'image3.jpg' }
  ]);
};
