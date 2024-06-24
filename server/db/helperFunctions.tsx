import {
  PlotDatum,
  DBPlotDatum,
  PlotPlant,
  PlotPlantJoinedRowEntry,
  Task,
} from '../../models/growGrub'
import * as db from '../db/growGrub.ts'

export function differentiatePlots(
  FEPlots: PlotDatum[],
  BEPlots: DBPlotDatum[],
  garden_id: number,
) {
  const plotsToCreate = []
  const plotsToUpdate = []

  // loop through plots received from front end and check if they exist in database
  // if so, add to plots to update; otherwise, add to plots to create

  for (const FEPlot of FEPlots) {
    // we need to compare plot_number, because the front-end plots don't include back-end IDs
    const matchingPlot = BEPlots.find(
      (BEPlot) => BEPlot.plot_number == Number(FEPlot.plotNumber),
    )
    if (matchingPlot) {
      plotsToUpdate.push({
        ...FEPlot,
        id: matchingPlot.id,
        garden_id: garden_id,
      })
    } else {
      plotsToCreate.push({ ...FEPlot })
    }
  }

  // Filter out the back-end plots that have no corresponding plot numbers in the front end
  const plotsToDelete = BEPlots.filter(
    (BEPlot) =>
      !FEPlots.some(
        (FEplot) => Number(FEplot.plotNumber) == BEPlot.plot_number,
      ),
  )

  // Map over the plots to delete and extract their IDs - these will be provided to the del function on the back-end
  const plotIDsToDelete = plotsToDelete.map((plot) => plot.id)

  return { plotsToCreate, plotsToUpdate, plotIDsToDelete }
}

export async function getPlantsIds(plotData: PlotDatum[]) {
  const plantsNames: string[] = []
  plotData.forEach((plot) => {
    if (plot.plants.length > 0) {
      plot.plants.forEach((plant) => {
        plantsNames.push(plant.plantName)
      })
    }
  })
  const plantsIds = await db.getPlantIDs(plantsNames)
  return plantsIds
}

export const getAllPlantsInGarden = async (
  garden_id: number,
  plantsToKeep: PlotPlant[],
) => {
  const existingDBPlantIDs = await db.getGardensPlantsById(garden_id)
  const idsToDelete = existingDBPlantIDs.filter(
    (plantId) => !plantsToKeep.find((plant) => plant.id === plantId.id),
  )
  return idsToDelete.map((obj) => obj.id)
}

export function refreshTasks(
  rows: PlotPlantJoinedRowEntry[],
  oldTasks: Task[],
  currentDate: Date,
) {
  const tasksToSort = []
  const tasksToCreate = []
  const tasksToUpdate = []
  // const tasksToDelete = []

  const millisecPerDay = 1000 * 60 * 60 * 24

  // Check to see if there should be a watering task assocaited with each joined plant_plot row
  for (const row of rows) {
    // Assume the plant needs watering if the last_watered field is falsey
    if (!row.last_watered) {
      tasksToSort.push({
        type: 'water',
        plots_plants_id: row.id,
        overdue_by: 0,
        completed: false,
      })
    }

    let daysBetweenWatering: number

    // Convert watering_frequency string to the number of days between watering.
    // Values for watering_frequency are inferred from routes/googleGemini.ts
    if (row.watering_frequency == 'low') {
      daysBetweenWatering = 7
    } else if (row.watering_frequency == 'moderate') {
      daysBetweenWatering = 4
    } else {
      daysBetweenWatering = 2
    }

    const lastWateredDateObject = new Date(row.last_watered)

    const daysSinceLastWater =
      (currentDate.getTime() - lastWateredDateObject.getTime()) / millisecPerDay

    // if the plant needs watering, add an associated task into tasksToSort
    if (daysSinceLastWater >= daysBetweenWatering) {
      tasksToSort.push({
        type: 'water',
        plots_plants_id: row.id,
        overdue_by: Math.floor(daysSinceLastWater - daysBetweenWatering),
        completed: false,
      })
    }
  }

  // Sort the tasks into those that already exist & need to be updated, and those that need to be created
  for (const newTask of tasksToSort) {
    const matchingTask = oldTasks.find(
      (oldTask) =>
        oldTask.plots_plants_id == newTask.plots_plants_id &&
        oldTask.type == newTask.type,
    )
    if (matchingTask) {
      tasksToUpdate.push({
        ...newTask,
        id: matchingTask.id,
      })
    } else {
      tasksToCreate.push({ ...newTask })
    }
  }

  // We could possibly add logic in here that deletes tasks from db

  return { tasksToCreate, tasksToUpdate }
}
