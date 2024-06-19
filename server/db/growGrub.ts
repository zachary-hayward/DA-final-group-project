import db from './connection.ts'

export async function getUserByAuth0Id(auth0Id: string) {
  return db('users').where({auth0_id: auth0Id}).first()
}