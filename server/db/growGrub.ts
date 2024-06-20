import { User, UserData, Plant, GardenDB } from '../../models/growGrub.ts'
import db from './connection.ts'


export async function getUserByAuth0Id(auth0Id: string): Promise<User> {
  return db('users').where({auth0_id: auth0Id})
    .first(
      'id',
      'username',
      'location'
    )
}

export function getUsernames(): Promise<string[]> {
  return db('users').select('username')
}

export function getPlants(): Promise<Plant[]> {
  return db('plants').select()
}

export function getUsersPlantsDesired(auth0Id: string): Promise<Plant[]> {
  return db('users').where('users.auth0_id', auth0Id)
    .join('user_desired_plants', 'user_desired_plants.user_id', 'users.id')
    .join('plants', 'plants.id', 'user_desired_plants.plant_id')
    .select('plants.*')
}

export function getUsersGardens(auth0Id: string) {
  return db('users').where('users.auth0_id', auth0Id)
    .join('gardens', 'gardens.user_id', 'users.id')
    .select(
      'gardens.*'
    )
}

export function getUserGarden(auth0Id: string, id: number): Promise<GardenDB[]> {
  return db('users').where('users.auth0_id', auth0Id).andWhere('gardens.id', id)
    .join('gardens', 'gardens.user_id', 'users.id')
    .join('plots', 'plots.garden_id', 'gardens.id')
    .join('plots_plants', 'plots_plants.plot_id', 'plots.id')
    .join('plants', 'plants.id', 'plots_plants.plant_id')
    .select(
      'gardens.*',
      'plots.*',
      'plots.name as plot_name',
      'plots_plants.*',
      'plots_plants.id as plot_plant_id',
      'plants.*',
      'plants.name as plant_name'
    )
}

interface addUserProps extends UserData {auth0_id: string}
export async function addUser(userData: addUserProps) {
  return db('users').insert(userData)
}
