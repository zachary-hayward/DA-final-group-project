import GardenGrid from '../components/GardenGrid.tsx'
import GardenForm from '../components/GardenForm.tsx'
import { useGetGardens, useSaveGarden } from '../hooks/useHooks.ts'

import { useState } from 'react'
import {
  layoutDefaultState,
  plotDataDefaultState,
} from '../functions/defaultState.ts'
import GardenSelect from '../components/GardenSelect.tsx'
import { GardenSimpleDB } from '../../models/growGrub.ts'

export function GardenView() {
  const saveGarden = useSaveGarden()
  const getGardens = useGetGardens()
  const [currentGardenID, setCurrentGardenID] = useState<number | undefined>()
  const [plotData, setPlotData] = useState(
    currentGardenID
      ? getGardens.data.find(
          (garden: GardenSimpleDB) => garden.id === currentGardenID,
        )
      : plotDataDefaultState,
  )
  const [activeID, setActiveID] = useState<string>('1')
  const [layout, setLayout] = useState(layoutDefaultState)

  if (getGardens.data && currentGardenID === undefined) {
    console.log(getGardens.data)
    return (
      <GardenSelect
        gardenData={getGardens.data}
        setCurrentGardenID={setCurrentGardenID}
      />
    )
  }

  // need to figure out how to change the state of the layout depending on the currentGardenID - could maybe work if the GardenSelect was its own page. Otherwise the more logical solution might be to pass down a function which will set the states/handle the click rather than passing so many states down

  // need to get the plotData from the db to update the state

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
