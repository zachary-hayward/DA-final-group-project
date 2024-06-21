import GardenGrid from '../components/GardenGrid.tsx'
import GardenForm from '../components/GardenForm.tsx'
import { useSaveGarden } from '../hooks/useHooks.ts'

import { useState } from 'react'

export function GardenView() {
  const saveGarden = useSaveGarden()

  const [plotData, setPlotData] = useState([
    {
      layoutId: '1',
      name: 'window garden',
      sunLight: 5,
      occupation: 10,
      blockType: 'house',
      size: '3x3',
      shade: 3,
      wind: 2,
      growable: true,
    },
    {
      layoutId: '2',
      name: 'glasshouse',
      sunLight: 5,
      occupation: 10,
      blockType: 'garden',
      size: '3x3',
      shade: 3,
      wind: 2,
      growable: true,
    },
    {
      layoutId: '3',
      name: 'kitchen garden',
      sunLight: 5,
      occupation: 10,
      blockType: 'garden',
      size: '3x3',
      shade: 3,
      wind: 2,
      growable: true,
    },
  ])
  const [activeID, setActiveID] = useState<string>('1')
  const [layout, setLayout] = useState([
    { w: 1, h: 16, x: 0, y: 0, i: '1' },
    { w: 2, h: 9, x: 2, y: 0, i: '2' },
    { w: 5, h: 1, x: 1, y: 9, i: '3' },
  ])

  // const oldInitialStateData = [
  //   {
  //     layoutId: '1',
  //     name: 'window garden',
  //     sunLight: 5,
  //     occupation: 10,
  //     blockType: 'house',
  //     size: '3x3',
  //     shade: 3,
  //     wind: 2,
  //     growable: true,
  //   },
  //   {
  //     layoutId: '2',
  //     name: 'glasshouse',
  //     sunLight: 5,
  //     occupation: 10,
  //     blockType: 'garden',
  //     size: '3x3',
  //     shade: 3,
  //     wind: 2,
  //     growable: true,
  //   },
  //   {
  //     layoutId: '3',
  //     name: 'kitchen garden',
  //     sunLight: 5,
  //     occupation: 10,
  //     blockType: 'garden',
  //     size: '3x3',
  //     shade: 3,
  //     wind: 2,
  //     growable: true,
  //   },
  // ]

  const onSaveGarden = async () => {
    saveGarden.mutateAsync(layout, plotData)
  }

  return (
    <>
      <div className="gardenview">
        <p>{activeID}</p>
        <GardenGrid
          plotData={plotData}
          setPlotData={setPlotData}
          setActiveID={setActiveID}
          layout={layout}
          setLayout={setLayout}
        />
        <GardenForm
          key={activeID}
          plotData={plotData}
          setPlotData={setPlotData}
          activeID={activeID}
          onSaveGarden={onSaveGarden}
        />
      </div>
    </>
  )
}
