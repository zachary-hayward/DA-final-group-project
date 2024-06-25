import type {
  User,
  UserData,
  Plant,
  GardenDB,
  Task,
} from '../../models/growGrub.ts'
import db from './connection.ts'
import type { ID, PlantID, NewPlant, PlotDatum } from '../../models/growGrub.ts'

export function getUserByAuth0Id(auth0Id: string): Promise<User> {
  return db('users')
    .where({ auth0_id: auth0Id })
    .first('id', 'username', 'location', 'summer_start_month as summerStarts')
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

export const getAllUsersPlots = (auth0Id: string) => {
  return db('users')
    .where('users.auth0_id', auth0Id)
    .join('gardens', 'gardens.user_id', 'users.id')
    .join('plots', 'plots.garden_id', 'gardens.id')
    .select(
      'garden_id as gardenId',
      'plots.name',
      'plot_number as plotNumber',
      'size',
      'plot_type as blockType',
      'rain_exposure as rainExposure',
      'sun_level as sunLight',
      'growable',
      'plots.id as id',
    )
}

export function getPlotPlantsByPlotId(id: number) {
  return db('plots_plants')
    .where('plot_id', id)
    .join('plants', 'plants.id', 'plots_plants.plant_id')
    .select(
      'plant_id',
      'user_id as userId',
      'date_planted',
      'plots_plants.name as name',
      'plants.name as plantName',
      'plots_plants.id as id',
    )
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

export function getPlantIDs(plantNames: string[]): Promise<PlantID[]> {
  return db('plants').whereIn(`name`, plantNames).select('id', 'name')
}

export function saveNewGarden(
  layout: string,
  userID: number,
): Promise<number[]> {
  const newGarden = {
    user_id: userID,
    layout: layout,
  }
  return db('gardens').insert(newGarden)
}

// Size mismatch + add growable
export function saveNewPlots(
  plotData: PlotDatum[],
  gardenID: number,
): Promise<ID[]> {
  if (plotData.length == 0) return Promise.resolve([]) // Return an empty array if there are no plots to save
  const plotsToInsert = plotData.map((plot) => ({
    garden_id: gardenID,
    plot_number: plot.plotNumber,
    sun_level: plot.sunLight,
    plot_type: plot.blockType,
    size: plot.size,
    name: plot.name,
    rain_exposure: plot.rainExposure,
    growable: plot.growable,
  }))
  return db('plots').insert(plotsToInsert).returning(['id'])
}

export function getPlotsByGardenID(garden_id: number) {
  return db('plots').where({ garden_id }).select()
}

export function updateGardenLayout(
  garden_id: number,
  updatedLayoutString: string,
) {
  return db('gardens')
    .where('id', garden_id)
    .update('layout', updatedLayoutString)
}

export async function updatePlots(
  plotData: PlotDatum[],
  garden_id: number,
): Promise<void> {
  try {
    if (plotData.length == 0) return // Exit the function w/o interacting w/ db if there are no plots to update
    const updatedPlotPromises = plotData.map(
      async (plot) =>
        await db('plots')
          .where({ garden_id, plot_number: plot.plotNumber })
          .update({
            sun_level: plot.sunLight,
            plot_type: plot.blockType,
            size: plot.size,
            name: plot.name,
            rain_exposure: plot.rainExposure,
          }),
    )
    await Promise.all(updatedPlotPromises)
  } catch (error) {
    console.log(error)
  }
}

export async function deletePlotsByID(plotIDs: number[]) {
  if (plotIDs.length == 0) return // Exit the function w/o interacting w/ db if there are no plots to delete
  return db('plots').whereIn('id', plotIDs).delete()
}

// export async function addVege(prompResult) {
//   const existingVege = await db('plant_care_data')
//     .where({ plantName: prompResult.plantCareData[0].plantName })
//     .first()
// }

export async function saveNewPlotPlants(
  plotIdArr: ID[],
  plotData: PlotDatum[],
  userId: number,
  plantsIDs: PlantID[],
) {
  const plantsToInsert: NewPlant[] = []
  plotData.forEach((plot, i) => {
    if (plot.plants.length > 0) {
      plot.plants.forEach((plant) => {
        const newPlant = {
          plant_id: plantsIDs.find(
            (currentPlant) =>
              currentPlant.name.toLowerCase() === plant.plantName.toLowerCase(),
          )?.id,
          user_id: userId,
          plot_id: plotIdArr[i].id,
          date_planted: plant.date_planted,
          name: plant.name,
        }
        plantsToInsert.push(newPlant)
      })
    }
  })
  await db('plots_plants').insert(plantsToInsert)
}

export async function saveNewPlants(plantsToInsert: NewPlant[]) {
  await db('plots_plants').insert(plantsToInsert)
}

export async function addVege(promptResult) {
  const existingVege = await db('plant_care_data')
    .where({ plantName: promptResult.plantCareData[0].plantName })
    .first()
  if (existingVege) {
    console.log(
      `Plant with name '${promptResult.plantCareData[0].plantName}' already exists in the plant_care_data database`,
    )
    return existingVege
  } else {
    const promptData = {
      plantName: promptResult.plantCareData[0].plantName,
      scientificName: promptResult.plantCareData[0].scientificName,
      description: promptResult.plantCareData[0].description,
      soil: promptResult.plantCareData[0].careInstructions.soil,
      sunlight: promptResult.plantCareData[0].careInstructions.sunlight,
      watering: promptResult.plantCareData[0].careInstructions.watering,
      fertilization:
        promptResult.plantCareData[0].careInstructions.fertilization,
      pruning: promptResult.plantCareData[0].careInstructions.pruning,
      pests: promptResult.plantCareData[0].careInstructions.pests,
      diseases: promptResult.plantCareData[0].careInstructions.diseases,
      indoorsPlantingTime:
        promptResult.plantCareData[0].plantingTime.indoorsPlantingTime,
      outdoorsPlantingTime:
        promptResult.plantCareData[0].plantingTime.outdoorsPlantingTime,
      spacing: promptResult.plantCareData[0].plantingTime.spacing,
      plantingTime: promptResult.plantCareData[0].plantingTime.plantingTime,
      havestingTime: promptResult.plantCareData[0].harvesting.harvestingTime,
      harvestingTips: promptResult.plantCareData[0].harvesting.harvestingTips,
    }
    // console.log(promptResult.plantCareData[0].harvesting.harvestingTime)
    return db('plant_care_data').insert(promptData)
  }
}
interface NewUserData extends UserData {
  plants: string[]
  auth0_id: string
}
export async function addUser({
  username,
  location,
  plants,
  summerStarts,
  auth0_id,
}: NewUserData) {
  try {
    await db.transaction(async (trx) => {
      const [user] = await trx('users').insert(
        { username, location, auth0_id, summer_start_month: summerStarts },
        ['id'],
      )
      const userId = user.id
      if (plants && plants.length > 0) {
        const knownPlants = await trx('plants').whereIn('name', plants)
        const desiredPlantsData = knownPlants.map((plant) => ({
          plant_id: plant.id,
          user_id: userId,
        }))
        await trx('user_desired_plants').insert(desiredPlantsData)
      }

      console.log(`added user ${userId}: ${username}`)
    })
  } catch (error) {
    console.log(error)
    throw new Error(`Couldn't add user`)
  }
}

export async function addPlant(promptResult) {
  const existingPlant = await db('plants')
    .where({ name: promptResult.plantCareData[0].plantName })
    .first()

  if (existingPlant) {
    console.log(
      `Plant with name '${promptResult.plantCareData[0].plantName}' already exists in the plants database`,
    )
    console.log(
      `Plant with name '${promptResult.plantCareData[0].plantName}' already exists in the plants database`,
    )
    return existingPlant
  } else {
    const promptData = {
      name: promptResult.plantCareData[0].plantName,
      difficulty: promptResult.plantCareData[0].careInstructions.difficulty,
      planting_starts:
        promptResult.plantCareData[0].careInstructions.planting_starts,
      planting_ends:
        promptResult.plantCareData[0].careInstructions.planting_ends,
      watering_frequency:
        promptResult.plantCareData[0].careInstructions.watering,
      sun_level: promptResult.plantCareData[0].careInstructions.sunlight,
      cycle: promptResult.plantCareData[0].careInstructions.cycle,
      days_from_planting_until_harvest:
        promptResult.plantCareData[0].careInstructions
          .days_from_planting_until_harvest,
      days_from_seed_until_seedling:
        promptResult.plantCareData[0].careInstructions
          .days_from_seed_until_seedling,
    }
    return db('plants').insert(promptData)
  }
}

export async function getSinglePlantById(plantName: string) {
  return db('plant_care_data')
    .where({ plantName: plantName })
    .select('*')
    .first()
}

export async function getGardensPlantsById(garden_id: number) {
  return db('gardens')
    .where('gardens.id', garden_id)
    .join('plots', 'plots.garden_id', 'gardens.id')
    .join('plots_plants', 'plots_plants.plot_id', 'plots.id')
    .select('plots_plants.id as id')
}

export async function deletePlotsPlantsByID(plantIDs: number[]) {
  if (plantIDs.length == 0) return // Exit the function w/o interacting w/ db if there are no plots to delete
  return db('plots_plants').whereIn('id', plantIDs).delete()
}

export async function getPlotsPlantsJoinByAuth(auth0_id: string) {
  return db('users')
    .where('users.auth0_id', auth0_id)
    .join('gardens', 'gardens.user_id', 'users.id')
    .join('plots', 'plots.garden_id', 'gardens.id')
    .join('plots_plants', 'plots_plants.plot_id', 'plots.id')
    .join('plants', 'plants.id', 'plots_plants.plant_id')
    .select('plots_plants.*', 'plants.*')
}

export async function getAllTasksByAuth(auth0_id: string) {
  return db('users')
    .where('users.auth0_id', auth0_id)
    .join('gardens', 'gardens.user_id', 'users.id')
    .join('plots', 'plots.garden_id', 'gardens.id')
    .join('plots_plants', 'plots_plants.plot_id', 'plots.id')
    .join('tasks', 'tasks.plots_plants_id', 'plots_plants.id')
    .select('tasks.*')
}

export async function getUncompletedTasksByAuth(auth0_id: string) {
  return db('users')
    .where('users.auth0_id', auth0_id)
    .join('gardens', 'gardens.user_id', 'users.id')
    .join('plots', 'plots.garden_id', 'gardens.id')
    .join('plots_plants', 'plots_plants.plot_id', 'plots.id')
    .join('tasks', 'tasks.plots_plants_id', 'plots_plants.id')
    .where('tasks.completed', false)
    .select('tasks.*')
}

export async function getUpdatedTasksByAuth(auth0_id: string) {
  return db('users')
    .where('users.auth0_id', auth0_id)
    .join('gardens', 'gardens.user_id', 'users.id')
    .join('plots', 'plots.garden_id', 'gardens.id')
    .join('plots_plants', 'plots_plants.plot_id', 'plots.id')
    .join('tasks', 'tasks.plots_plants_id', 'plots_plants.id')
    .join('plants', 'plants.id', 'plots_plants.plant_id')
    .where('tasks.completed', false)
    .select(
      'tasks.*',
      'plots_plants.name',
      'plots_plants.date_planted',
      'plots_plants.last_watered',
      'plants.photo_src',
    )
}

export async function updateTasks(tasksToUpdate: Task[]): Promise<void> {
  try {
    if (tasksToUpdate.length == 0) return // Exit the function w/o interacting w/ db if there are no plots to update
    const updatedTaskPromises = tasksToUpdate.map(
      async (task) =>
        await db('tasks').where('id', task.id).update({
          overdue_by: task.overdue_by,
          completed: false,
        }),
    )
    await Promise.all(updatedTaskPromises)
  } catch (error) {
    console.log(error)
  }
}

export async function createTasks(
  tasksToCreate: Omit<Task, 'id'>[],
): Promise<number[]> {
  if (tasksToCreate.length == 0) return Promise.resolve([]) // Return an empty array if there are no plots to save
  return db('tasks').insert(tasksToCreate).returning(['id'])
}
