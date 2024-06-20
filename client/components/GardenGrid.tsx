import { useEffect, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveGridLayout = WidthProvider(Responsive)

type BlockDatum = {
  layoutId: string
  name: string
  sunLight: number
  occupation: number
}

interface GardenGridProps {
  blockData: BlockDatum[]
  setActiveID: React.Dispatch<React.SetStateAction<string>>
}

export function GardenGrid({ blockData, setActiveID }: GardenGridProps) {
  // DONE *** Create a garden View page

  // DONE *** Get the blockData to link to layout -

  // create a form component to edit the blockData

  // DONE *** When a new block is added it changes the activeID -

  // if a new block is added then a new blockData object needs to be pushed into blockData state

  // send BlockData to the DB

  // need to solve - if the screen size changes the grid can move slightly

  // style blocks depending on type

  //  send to DB
  //  <App>
  //    <GardenView>
  //      [State of blockData would live here]
  //      <GridElements {blockData}>
  //      <Form component {setBlockData}>
  //    </GardenView>

  const [layout, setLayout] = useState([
    { w: 1, h: 16, x: 0, y: 0, i: '1' },
    { w: 2, h: 9, x: 2, y: 0, i: '2' },
    { w: 5, h: 1, x: 1, y: 9, i: '3' },
  ])

  // const oldTestData = [
  //   { w: 1, h: 5, x: 0, y: 0, i: '1' },
  //   { w: 2, h: 3, x: 2, y: 0, i: '2' },
  //   { w: 1, h: 2, x: 2, y: 3, i: '3' },
  // ]

  const handleAdd = () => {
    console.log('handleAdd was triggered')
    const newLayout = [...layout]
    const existingHighestIndex = Number(newLayout[newLayout.length - 1].i)
    const newIdx = String(existingHighestIndex + 1)
    newLayout.push({
      i: newIdx,
      x: 4,
      y: 0,
      w: 4,
      h: 4,
    })
    setLayout(newLayout)
    setActiveID(newIdx)
  }

  // useEffect(() => {
  //   console.log(layout)
  // }, [layout])

  const handleClick = (e) => {
    // console.log(e.target.id.slice(5))
    setActiveID(e.target.id.slice(5))
  }

  const handleLayoutChange = (newLay) => {
    setLayout(newLay)
  }
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 3 }
  return (
    <div className="garden-grid">
      <button onClick={handleAdd}>Add Block</button>
      <ResponsiveGridLayout
        className="layout"
        layout={layout}
        onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={cols}
        rowHeight={30}
        // width={1200}
        margin={[0, 0]}
      >
        {layout.map((block) => (
          <button
            key={block.i}
            id={`block${block.i}`}
            onPointerDown={handleClick}
            className="red"
            data-grid={{ x: block.x, y: block.y, h: block.h, w: block.w }}
          >
            {
              [...blockData].find(
                (blockEntry) => blockEntry.layoutId == block.i,
              )?.name
            }
          </button>
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default GardenGrid
