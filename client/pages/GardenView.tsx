import GardenGrid from '../components/GardenGrid.tsx'
import GardenForm from '../components/GardenForm.tsx'
import {
  useGetGardens,
  useSaveGarden,
  useSaveNewGarden,
} from '../hooks/useHooks.ts'

import { useState } from 'react'
import {
  layoutDefaultState,
  plotDataDefaultState,
} from '../functions/defaultState.ts'
import GardenSelect from '../components/GardenSelect.tsx'
import {
  GardenSimpleDB,
  PlotDatum,
  PlotDatumDB,
} from '../../models/growGrub.ts'

export function GardenView() {
  const saveGarden = useSaveGarden()
  const saveNewGarden = useSaveNewGarden()
  const getGardens = useGetGardens()
  const [currentGardenID, setCurrentGardenID] = useState<number | null>(null)
  const [plotData, setPlotData] = useState<PlotDatum[]>(plotDataDefaultState)
  const [activeID, setActiveID] = useState<string>('1')
  const [layout, setLayout] = useState(layoutDefaultState)

  if (
    getGardens.data &&
    getGardens.data.gardens.length > 0 &&
    currentGardenID === null
  ) {
    return (
      <GardenSelect
        gardenData={getGardens.data.gardens}
        switchSelectedGarden={switchSelectedGarden}
      />
      
    )
  
  }

  function switchSelectedGarden(id: number) {
    setCurrentGardenID(id)
    const currentGarden = getGardens.data.gardens.find(
      (garden: GardenSimpleDB) => garden.id === id,
    )
    //////////////////////////////////////////////////////////////////////
    //  REMOVE THE .MAP PLANTS ADDING FUNCTION BELOW ONCE ADDING PLANTS TO THE DATABASE HAS BEEN SOLVED
    //////////////////////////////////////////////////////////////////////
    const currentPlotData = getGardens.data.plots
      .filter((plot: PlotDatumDB) => plot.gardenId === id)
      .map((plot: PlotDatumDB) => {
        return { ...plot, plotNumber: String(plot.plotNumber) }
      })
      .map((plot: PlotDatumDB) => {
        return { ...plot, plants: [] }
      })
    setPlotData(currentPlotData)
    setLayout(JSON.parse(currentGarden.layout))
  }

  const onSaveGarden = async () => {
    saveGarden.mutateAsync({ layout, plotData, garden_id: currentGardenID })
  }

  const onSaveNewGarden = async () => {
    saveNewGarden.mutateAsync({ layout, plotData })
  }

  return (
    <>
    {/* Page Banner - hard coded - currently WIP of componentising it */}
    <div className="banner-container">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="banner-title">My Garden</h2>
        </div>
      </div>
    
      <div className="gardenview py-20">
        <GardenGrid
          plotData={plotData}
          setPlotData={setPlotData}
          setActiveID={setActiveID}
          layout={layout}
          setLayout={setLayout}
          currentGardenID={currentGardenID}
          setCurrentGardenID={setCurrentGardenID}
        />
        <GardenForm
          key={activeID}
          plotData={plotData}
          setPlotData={setPlotData}
          activeID={activeID}
          onSaveGarden={onSaveGarden}
          onSaveNewGarden={onSaveNewGarden}
          layout={layout}
          setLayout={setLayout}
          currentGardenID={currentGardenID}
        />
      </div>
    </>
  )
}
