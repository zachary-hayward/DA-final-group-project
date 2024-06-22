import GardenGrid from '../components/GardenGrid.tsx'
import GardenForm from '../components/GardenForm.tsx'
import { useSaveGarden } from '../hooks/useHooks.ts'

import { useState } from 'react'

export function GardenView() {
  const saveGarden = useSaveGarden()

  const [plotData, setPlotData] = useState([
    {
      plotNumber: '1',
      name: 'House',
      sunLight: 'full-sun',
      blockType: 'house',
      size: 3,
      rainExposure: 'partially',
      growable: true,
    },
    {
      plotNumber: '2',
      name: '',
      sunLight: 'part-sun',
      blockType: 'path',
      size: 3,
      rainExposure: 'partially',
      growable: true,
    },
    {
      plotNumber: '4',
      name: '',
      sunLight: 'full-sun',
      blockType: 'path',
      size: 3,
      rainExposure: 'partially',
      growable: true,
    },
    {
      plotNumber: '6',
      name: '',
      sunLight: 'full-sun',
      blockType: 'grass',
      size: 3,
      rainExposure: 'partially',
      growable: true,
    },
    {
      plotNumber: '7',
      name: 'Berries',
      sunLight: 'full-sun',
      blockType: 'garden',
      size: 3,
      rainExposure: 'partially',
      growable: true,
    },
    {
      plotNumber: '8',
      name: 'Glasshouse',
      sunLight: 'full-sun',
      blockType: 'garden',
      size: 3,
      rainExposure: 'partially',
      growable: true,
    },
    {
      plotNumber: '9',
      name: '',
      sunLight: 'full-sun',
      blockType: 'grass',
      size: 3,
      rainExposure: 'partially',
      growable: true,
    },
    {
      plotNumber: '10',
      name: 'Back fence',
      sunLight: 'full-sun',
      blockType: 'garden',
      size: 3,
      rainExposure: 'partially',
      growable: true,
    },
    {
      plotNumber: '3',
      name: 'Kitchen garden',
      sunLight: 'full-shade',
      blockType: 'garden',
      size: 3,
      rainExposure: 'partially',
      growable: true,
    },
  ])
  const [activeID, setActiveID] = useState<string>('1')
  const [layout, setLayout] = useState([
    { i: '1', x: 0, y: 0, w: 11, h: 6 },
    { i: '2', x: 11, y: 0, w: 3, h: 8 },
    { i: '3', x: 14, y: 0, w: 12, h: 10 },
    { i: '4', x: 0, y: 6, w: 11, h: 2 },
    { i: '6', x: 26, y: 3, w: 21, h: 7 },
    { i: '7', x: 26, y: 0, w: 21, h: 3 },
    { i: '8', x: 0, y: 8, w: 14, h: 9 },
    { i: '9', x: 14, y: 10, w: 33, h: 3 },
    { i: '10', x: 14, y: 13, w: 33, h: 4 },
  ])

  const onSaveGarden = async () => {
    console.log(layout)
    console.log(plotData)
    saveGarden.mutateAsync({ layout, plotData })
  }

  // if (saveGarden.data) {
  //   console.log(saveGarden.data)
  // }

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
