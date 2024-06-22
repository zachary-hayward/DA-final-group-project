import { PlotDatum, DBPlotDatum } from '../../models/growGrub'

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
        // plot_number: FEPlot.plotNumber,
        // sun_level: FEPlot.sunLight,
        // plot_type: FEPlot.blockType,
        // size: FEPlot.size,
        // name: FEPlot.name,
        // rain_exposure: FEPlot.rainExposure,
      })
    } else {
      plotsToCreate.push({ ...FEPlot })
    }
  }
  // export interface PlotDatum {
  //   plotNumber: string
  //   name: string
  //   sunLight: string
  //   blockType: string
  //   size: string
  //   rainExposure: string
  //   growable: boolean
  // }

  // // export interface DBPlotDatum extends PlotDatum {
  // //   id: number
  // // }

  // export interface DBPlotDatum {
  //   id: number
  //   garden_id: number
  //   plot_number: number
  //   sun_level: string
  //   plot_type: string
  //   size: number
  //   name: string
  //   rain_exposure: string
  // }

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
