import GardenGrid from '../components/GardenGrid.tsx'
import GardenForm from '../components/GardenForm.tsx'

import { useState } from 'react'

export function GardenView() {
  const [blockData, setBlockData] = useState([
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

  const [activeID, setActiveID] = useState<string>('1')

  return (
    <>
      <div className="gardenview">
        <p>{activeID}</p>
        <GardenGrid
          blockData={blockData}
          setBlockData={setBlockData}
          setActiveID={setActiveID}
        />
        <GardenForm
          key={activeID}
          blockData={blockData}
          setBlockData={setBlockData}
          activeID={activeID}
        />
      </div>
    </>
  )
}
