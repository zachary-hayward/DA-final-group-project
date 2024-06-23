// import { useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import type { Layout } from 'react-grid-layout'
import type { PlotDatum } from '../../models/growGrub'
import { getRandomInt } from '../functions/random'
import SecondaryButton from './SecondaryButton'
import GoBackButton from './GoBackButton'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

interface GardenGridProps {
  plotData: PlotDatum[]
  setPlotData: React.Dispatch<React.SetStateAction<PlotDatum[]>>
  setActiveID: React.Dispatch<React.SetStateAction<string>>
  layout: Layout[]
  setLayout: React.Dispatch<React.SetStateAction<Layout[]>>
  currentGardenID: number | undefined
  setCurrentGardenID: React.Dispatch<React.SetStateAction<number | undefined>>
}

export function GardenGrid({
  plotData,
  setPlotData,
  setActiveID,
  layout,
  setLayout,
  currentGardenID,
  setCurrentGardenID,
}: GardenGridProps) {
  const handleAdd = () => {
    const newLayout = [...layout]
    const existingHighestIndex = Number(newLayout[newLayout.length - 1].i)
    const newIdx = String(existingHighestIndex + 1)
    newLayout.push({
      i: newIdx,
      x: getRandomInt(0, 50),
      y: 50,
      w: 8,
      h: 8,
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
      plants: [],
    })
    setPlotData(newPlotData)
  }

  const handleClick = (e: React.PointerEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLElement
    target.tagName == 'BUTTON' ? setActiveID(target.id.slice(4)) : null
  }

  const handleLayoutChange = (newLay: Layout[]) => {
    setLayout(newLay)
  }

  function handleGoBack() {
    confirmAlert({
      title: `Are you sure?`,
      message: 'Any unsaved data will be lost.',
      buttons: [
        {
          label: 'My gardens',
          onClick: () => {
            setCurrentGardenID(undefined)
          },
        },
        { label: 'Stay here' },
      ],
    })
  }
  const cols = { lg: 50, md: 50, sm: 50, xs: 50, xxs: 50 }
  return (
    <div className="garden-grid">
      {currentGardenID && (
        <GoBackButton onClick={handleGoBack}>My gardens</GoBackButton>
      )}
      <SecondaryButton onClick={handleAdd}>Add Plot</SecondaryButton>
      <ResponsiveGridLayout
        className="layout"
        onLayoutChange={handleLayoutChange}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={cols}
        rowHeight={15}
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
