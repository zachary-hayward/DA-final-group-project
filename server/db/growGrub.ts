import { User, UserData, Plant, GardenDB } from '../../models/growGrub.ts'
import db from './connection.ts'

export async function getUserByAuth0Id(auth0Id: string): Promise<User> {
  return db('users')
    .where({ auth0_id: auth0Id })
    .first('id', 'username', 'location')
}

interface getUsernameProps {
  username: string
}
export function getUsernames(): Promise<getUsernameProps[]> {
  return db('users').select('username')
}

export function getPlants(): Promise<Plant[]> {
  return db('plants').select()
}

export function getUsersPlantsDesired(auth0Id: string): Promise<Plant[]> {
  return db('users')
    .where('users.auth0_id', auth0Id)
    .join('user_desired_plants', 'user_desired_plants.user_id', 'users.id')
    .join('plants', 'plants.id', 'user_desired_plants.plant_id')
    .select('plants.*')
}

export function getUsersGardens(auth0Id: string) {
  return db('users')
    .where('users.auth0_id', auth0Id)
    .join('gardens', 'gardens.user_id', 'users.id')
    .select('gardens.*')
}

export function getUserGarden(
  auth0Id: string,
  id: number,
): Promise<GardenDB[]> {
  return db('users')
    .where('users.auth0_id', auth0Id)
    .andWhere('gardens.id', id)
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
      'plants.name as plant_name',
    )
}

interface addUserProps extends UserData {
  auth0_id: string
}
export async function addUser(userData: addUserProps) {
  return db('users').insert(userData)
}

export async function addVege(promptResult) {
  try {
    const promptData = {
      plantName: 'Watermelon',
      scientificName: promptResult[0].scientificName,
      description: promptResult[0].description,
      soil: promptResult[0].soil,
      sunlight: promptResult[0].sunlight,
      watering: promptResult[0].watering,
      fertilization: promptResult[0].fertilization,
      pruning: promptResult[0].pruning,
      pests: promptResult[0].pests,
      diseases: promptResult[0].diseases,
      indoorsPlantingTime: promptResult[1].indoorsPlantingTime,
      outdoorsPlantingTime: promptResult[1].outdoorsPlantingTime,
      spacing: promptResult[1].spacing,
      plantingTime: promptResult[1].plantingTime,
      havestingTime: promptResult[2].harvestingTime,
      harvestingTips: promptResult[2].harvestingTips,
    }
    const [insertedData] = await db('plant_care_data')
      .insert(promptData)
      .returning('*')
    console.log(promptData)
    return insertedData
  } catch (error) {
    console.error(`Error adding plant: ${error}`)
    throw error
  }

  // const promptData = {
  //   plantName: 'Watermelon',
  //   scientificName: prompResult[0].scientificName,
  //   description: prompResult[0].description,
  //   soil: prompResult[0].soil,
  //   sunlight: prompResult[0].sunlight,
  //   watering: prompResult[0].watering,
  //   fertilization: prompResult[0].fertilization,
  //   pruning: prompResult[0].pruning,
  //   pests: prompResult[0].pests,
  //   diseases: prompResult[0].diseases,
  //   indoorsPlantingTime: prompResult[1].indoorsPlantingTime,
  //   outdoorsPlantingTime: prompResult[1].outdoorsPlantingTime,
  //   spacing: prompResult[1].spacing,
  //   plantingTime: prompResult[1].plantingTime,
  //   havestingTime: prompResult[2].harvestingTime,
  //   harvestingTips: prompResult[2].harvestingTips,
  // }
  // console.log(promptData)
  // return db('plant_care_data').insert(promptData)
}
