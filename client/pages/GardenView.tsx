import GardenGrid from '../components/GardenGrid.tsx'
import GardenForm from '../components/GardenForm.tsx'
import { useGetGardens, useSaveGarden } from '../hooks/useHooks.ts'

import { useState } from 'react'
import {
  layoutDefaultState,
  plotDataDefaultState,
} from '../functions/defaultState.ts'
import GardenSelect from '../components/GardenSelect.tsx'
import { GardenSimpleDB, PlotDatumDB } from '../../models/growGrub.ts'

export function GardenView() {
  const saveGarden = useSaveGarden()
  const getGardens = useGetGardens()
  const [currentGardenID, setCurrentGardenID] = useState<number | undefined>()
  const [plotData, setPlotData] = useState(plotDataDefaultState)
  const [activeID, setActiveID] = useState<string>('1')
  const [layout, setLayout] = useState(layoutDefaultState)

  if (
    getGardens.data &&
    getGardens.data.gardens.length > 0 &&
    currentGardenID === undefined
  ) {
    return (
      <GardenSelect
        gardenData={getGardens.data.gardens}
        switchSelectedGarden={switchSelectedGarden}
      />
    )
  }
  // merge with dev

  function switchSelectedGarden(id: number) {
    setCurrentGardenID(id)
    const currentGarden = getGardens.data.gardens.find(
      (garden: GardenSimpleDB) => garden.id === id,
    )
    const currentPlotData = getGardens.data.plots
      .filter((plot: PlotDatumDB) => plot.gardenId === id)
      .map((plot: PlotDatumDB) => {
        return { ...plot, plotNumber: String(plot.plotNumber) }
      })
    setPlotData(currentPlotData)
    setLayout(JSON.parse(currentGarden.layout))
  }

  const onSaveGarden = async () => {
    saveGarden.mutateAsync({ layout, plotData })
  }

  return (
    <>
      <div className="gardenview">
        <GardenGrid
          plotData={plotData}
          setPlotData={setPlotData}
          setActiveID={setActiveID}
          layout={layout}
          setLayout={setLayout}
          setCurrentGardenID={setCurrentGardenID}
        />
        <GardenForm
          key={activeID}
          plotData={plotData}
          setPlotData={setPlotData}
          activeID={activeID}
          onSaveGarden={onSaveGarden}
          layout={layout}
          setLayout={setLayout}
        />
      </div>
    </>
  )
}
