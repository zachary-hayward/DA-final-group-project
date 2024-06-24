import { PlotDatum, DBPlotDatum } from '../../models/growGrub'
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
