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

{
  /* <GardenGrid > 
  <p>
Saving a garden for the first time (i.e. creating a garden)

Single hook that saves the current garden (blockData, layout):

1) saving the layout to the gardens db - making a new entry in the db
1.5) get the new garden/layout ID from the DB
2) going through the block data, for each datum/plot, saving that in the plots db using teh new garden ID (blocksData, newGardenID) - note: all handling in backend
2.5) return the new plot IDs
3) loop through the plants for each plot data, save that data to the plants_plots table using the new plot ID(s)

</p>
</GardenGrid> */
}
