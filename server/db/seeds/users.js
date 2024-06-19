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
};
