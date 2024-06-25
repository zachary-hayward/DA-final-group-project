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
import Banner from '../components/Banner.tsx'


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
      <>
        <Banner 
          bannerInfo= {{
            title: "Select A Garden"
          }}
        />
        <GardenSelect
          gardenData={getGardens.data.gardens}
          switchSelectedGarden={switchSelectedGarden}
        />
      </>
    )
  
  }

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
    saveGarden.mutateAsync({ layout, plotData, garden_id: currentGardenID })
  }

  const onSaveNewGarden = async () => {
    saveNewGarden.mutateAsync({ layout, plotData })
  }

  return (
    <>
      <Banner 
        bannerInfo={{
          title: 'Create My Garden'
        }}
      />
      <div className="gardenview">
        <p>{activeID}</p>

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
