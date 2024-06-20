import { useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface BlockDatum {
  layoutId: string
  name: string
  sunLight: number
  occupation: number
  blockType: string
  size: string
  shade: number
  wind: number
  growable: boolean
}

interface GridDatum {
  w: number
  h: number
  x: number
  y: number
  i: string
}

interface GardenGridProps {
  blockData: BlockDatum[]
  setBlockData: React.Dispatch<React.SetStateAction<BlockDatum[]>>
  setActiveID: React.Dispatch<React.SetStateAction<string>>
}

export function GardenGrid({
  blockData,
  setBlockData,
  setActiveID,
}: GardenGridProps) {
  // send data to the DB

  // need to solve - if the screen size changes the grid can move slightly

  // responsiveness settle?

  // style blocks depending on type

  const [layout, setLayout] = useState([
    { w: 1, h: 16, x: 0, y: 0, i: '1' },
    { w: 2, h: 9, x: 2, y: 0, i: '2' },
    { w: 5, h: 1, x: 1, y: 9, i: '3' },
  ])

  const handleAdd = () => {
    console.log('handleAdd was triggered')
    const newLayout = [...layout]
    const existingHighestIndex = Number(newLayout[newLayout.length - 1].i)
    const newIdx = String(existingHighestIndex + 1)
    newLayout.push({
      i: newIdx,
      x: 0,
      y: 0,
      w: 1,
      h: 1,
    })
    setLayout(newLayout)
    setActiveID(newIdx)
    const newBlockData = [...blockData]
    newBlockData.push({
      layoutId: newIdx,
      name: `Block ${newIdx}`,
      sunLight: 0,
      occupation: 0,
      blockType: '',
      size: '',
      shade: 0,
      wind: 0,
      growable: true,
    })
    setBlockData(newBlockData)
  }

  const handleClick = (e: React.PointerEvent<HTMLButtonElement>) => {
    setActiveID(e.target.id.slice(5))
  }

  const handleLayoutChange = (newLay: GridDatum[]) => {
    setLayout(newLay)
  }
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 3 }
  return (
    <div className="garden-grid">
      <button onClick={handleAdd}>Add Block</button>
      <ResponsiveGridLayout
        className="layout"
        // layout={layout}
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
