import GardenGrid from '../components/GardenGrid.tsx'
import GardenForm from '../components/GardenForm.tsx'

import { useEffect, useState } from 'react'

export function GardenView() {
  const [blockData, setBlockData] = useState([
    { layoutId: '1', name: 'window garden', sunLight: 5, occupation: 10 },
    { layoutId: '2', name: 'glasshouse', sunLight: 5, occupation: 10 },
    { layoutId: '3', name: 'kitchen garden', sunLight: 5, occupation: 10 },
  ])

  const [activeID, setActiveID] = useState<string>('1')

  // useEffect(() => {
  //   console.log(activeID)
  // }, [activeID])

  return (
    <>
      <div className="gardenview">
        <p>{activeID}</p>
        <GardenGrid blockData={blockData} setActiveID={setActiveID} />
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
