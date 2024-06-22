import GardenGrid from '../components/GardenGrid.tsx'
import GardenForm from '../components/GardenForm.tsx'
import { useGetGardens, useSaveGarden } from '../hooks/useHooks.ts'

import { useState } from 'react'
import {
  layoutDefaultState,
  plotDataDefaultState,
} from '../functions/defaultState.ts'
import GardenSelect from '../components/GardenSelect.tsx'

export function GardenView() {
  const saveGarden = useSaveGarden()
  const getGardens = useGetGardens()
  const [plotData, setPlotData] = useState(plotDataDefaultState)
  const [activeID, setActiveID] = useState<string>('1')
  const [layout, setLayout] = useState(layoutDefaultState)
  const [currentGardenID, setCurrentGardenID] = useState<number | undefined>()

  if (getGardens.data && currentGardenID === undefined) {
    console.log(getGardens.data)
    return (
      <GardenSelect
        gardenData={getGardens.data}
        setCurrentGardenID={setCurrentGardenID}
      />
    )
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
