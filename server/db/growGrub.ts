import { User, UserData, Plant, GardenDB } from '../../models/growGrub.ts'
import db from './connection.ts'
import type { PlotDatum } from '../../models/growGrub.ts'

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
): Promise<number[]> {
  if (plotData.length == 0) return Promise.resolve([]) // Return an empty array if there are no plots to save
  const plotsToInsert = plotData.map((plot) => ({
    garden_id: gardenID,
    plot_number: plot.plotNumber,
    sun_level: plot.sunLight,
    plot_type: plot.blockType,
    size: plot.size,
    name: plot.name,
    rain_exposure: plot.rainExposure,
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

interface addUserProps extends UserData {
  auth0_id: string
}
export async function addUser(userData: addUserProps) {
  return db('users').insert(userData)
}
