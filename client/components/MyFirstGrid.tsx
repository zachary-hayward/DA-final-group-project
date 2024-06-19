import React, { useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
// import SecondGrid from './SecondGidLayout'

const ResponsiveGridLayout = WidthProvider(Responsive)

const MyFirstGrid = () => {
  const [layout, setLayout] = useState([
    { i: '1', x: 0, y: 0, w: 4, h: 4 },
    { i: '2', x: 1, y: 6, w: 4, h: 4, minW: 2, maxW: 4 },
    { i: '3', x: 4, y: 0, w: 4, h: 4 },
  ])

  const [blockData, setBlockData] = useState([
    { i: 1, name: 'window garden', sunHours: 5, mainSunTime: 'Morning' },
  ])

  const handleAdd = () => {
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
  }

  const handleClick = (e) => {
    console.log(e.target.id.slice(5))
  }

  const handleLayoutChange = (newLay) => {
    setLayout(newLay)
  }
  const cols = { lg: 12, md: 10, sm: 10, xs: 10, xxs: 2 }
  console.log(layout)
  return (
    <>
      <button onClick={handleAdd}>Add Block</button>
      <ResponsiveGridLayout
        className="layout"
        layout={layout}
        onLayoutChange={handleLayoutChange}
        cols={cols}
        rowHeight={30}
        width={1200}
        margin={[0, 0]}
      >
        {layout.map((block) => (
          <button
            key={block.i}
            id={`block${block.i}`}
            onPointerDown={handleClick}
            className="red"
          >
            {block.i}
          </button>
        ))}
      </ResponsiveGridLayout>
    </>
  )
}

export default MyFirstGrid
