import { User, UserDB } from '../../models/growGrub.ts'
import db from './connection.ts'


export async function getUserByAuth0Id(auth0Id: string): Promise<UserDB> {
  return db('users').where({auth0_id: auth0Id}).first(
    'id',
    'username',
    'location'
  )
}

interface addUserProps extends User {auth0_id: string}
export async function addUser(userData: addUserProps) {
  return db('users').insert(userData).returning('id')
}