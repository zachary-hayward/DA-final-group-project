// import { useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import type { Layout } from 'react-grid-layout'
import type { PlotDatum } from '../../models/growGrub'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface GardenGridProps {
  plotData: PlotDatum[]
  setPlotData: React.Dispatch<React.SetStateAction<PlotDatum[]>>
  setActiveID: React.Dispatch<React.SetStateAction<string>>
  layout: Layout[]
  setLayout: React.Dispatch<React.SetStateAction<Layout[]>>
}

export function GardenGrid({
  plotData,
  setPlotData,
  setActiveID,
  layout,
  setLayout,
}: GardenGridProps) {
  // send data to the DB

  // responsiveness settle?

  // style blocks depending on type

  const handleAdd = () => {
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
    const newPlotData = [...plotData]
    newPlotData.push({
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
    setPlotData(newPlotData)
  }

  const handleClick = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.target.tagName == 'BUTTON' ? setActiveID(e.target.id.slice(5)) : null
  }

  const handleLayoutChange = (newLay: Layout[]) => {
    setLayout(newLay)
  }

  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 3 }
  return (
    <div className="garden-grid">
      <button onClick={handleAdd}>Add Block</button>
      <ResponsiveGridLayout
        className="layout"
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
              [...plotData].find((blockEntry) => blockEntry.layoutId == block.i)
                ?.name
            }
          </button>
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default GardenGrid
