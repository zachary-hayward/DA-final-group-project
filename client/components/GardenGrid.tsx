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
      x: 20,
      y: 20,
      w: 8,
      h: 3,
    })
    setLayout(newLayout)
    setActiveID(newIdx)
    const newPlotData = [...plotData]
    newPlotData.push({
      plotNumber: newIdx,
      name: `Block ${newIdx}`,
      sunLight: 'full-sun',
      blockType: 'garden',
      size: 2,
      rainExposure: 'fully',
      growable: true,
    })
    setPlotData(newPlotData)
  }

  const handleClick = (e: React.PointerEvent<HTMLButtonElement>) => {
    console.log(e)
    e.target.tagName == 'BUTTON' ? setActiveID(e.target.id.slice(4)) : null
  }

  const handleLayoutChange = (newLay: Layout[]) => {
    setLayout(newLay)
  }

  const cols = { lg: 50, md: 50, sm: 50, xs: 50, xxs: 50 }
  return (
    <div className="garden-grid">
      <button onClick={handleAdd}>Add Block</button>
      <ResponsiveGridLayout
        className="layout"
        onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={cols}
        rowHeight={15}
        // width={1200}
        margin={[0, 0]}
      >
        {layout.map((plot) => (
          <button
            key={plot.i}
            id={`plot${plot.i}`}
            onPointerDown={handleClick}
            className={
              plotData.find((obj) => obj.plotNumber === plot.i)?.blockType
            }
            data-grid={{ x: plot.x, y: plot.y, h: plot.h, w: plot.w }}
          >
            {
              [...plotData].find((plotEntry) => plotEntry.plotNumber == plot.i)
                ?.name
            }
          </button>
        ))}
      </ResponsiveGridLayout>
    </div>
  )
}

export default GardenGrid
