import React, { useEffect, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'

const ResponsiveGridLayout = WidthProvider(Responsive)

function GardenGrid() {
  // Figure out how to save a layout  -  send to DB

  // Create a garden View page

  // Get the blockData to link to layout

  // create a form component to edit the blockData

  // send BlockData to the DB

  const [layout, setLayout] = useState([
    { w: 1, h: 5, x: 0, y: 0, i: '1' },
    { w: 2, h: 3, x: 2, y: 0, i: '2' },
    { w: 1, h: 2, x: 2, y: 3, i: '3' },
  ])
  // [
  //   { w: 1, h: 5, x: 0, y: 0, i: '1' },
  //   { w: 2, h: 3, x: 2, y: 0, i: '2' },
  //   { w: 1, h: 2, x: 2, y: 3, i: '3' }
  // ]
  // [
  //   { i: '1', x: 0, y: 0, w: 4, h: 4 },
  //   { i: '2', x: 1, y: 6, w: 4, h: 4, minW: 2, maxW: 4 },
  //   { i: '3', x: 4, y: 0, w: 4, h: 4 },
  // ]

  const [blockData, setBlockData] = useState([
    { layoutId: '1', name: 'window garden', sunLight: 5 },
    { layoutId: '2', name: 'glasshouse', sunLight: 5 },
    { layoutId: '3', name: 'kitchen garden', sunLight: 5 },
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

  useEffect(() => {
    console.log(layout)
  }, [layout])

  const handleClick = (e) => {
    console.log(e.target.id.slice(5))
  }

  const handleLayoutChange = (newLay) => {
    setLayout(newLay)
  }
  const cols = { lg: 12, md: 10, sm: 10, xs: 10, xxs: 2 }
  // console.log(layout)
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

export default GardenGrid
