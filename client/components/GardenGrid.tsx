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
    { w: 1, h: 16, x: 0, y: 0, i: '1' },
    { w: 2, h: 9, x: 2, y: 0, i: '2' },
    { w: 5, h: 1, x: 1, y: 9, i: '3' },
  ])

  const oldTestData = [
    { w: 1, h: 5, x: 0, y: 0, i: '1' },
    { w: 2, h: 3, x: 2, y: 0, i: '2' },
    { w: 1, h: 2, x: 2, y: 3, i: '3' },
  ]

  const [blockData, setBlockData] = useState([
    { layoutId: '1', name: 'window garden', sunLight: 5 },
    { layoutId: '2', name: 'glasshouse', sunLight: 5 },
    { layoutId: '3', name: 'kitchen garden', sunLight: 5 },
  ])

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
  }

  useEffect(() => {
    console.log(layout)
  }, [layout])

  const handleClick = (e) => {
    console.log('handleClick was triggered')
    console.log(e.target.id.slice(5))
  }

  const handleLayoutChange = (newLay) => {
    if (newLay !== layout) {
      console.log('handleLayoutChange was triggered')
      // console.log('The new layout is: ')
      // console.log(newLay)
      setLayout(newLay)
    }
  }
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 3 }
  // console.log(layout)
  return (
    <>
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
            {block.i}
          </button>
        ))}
      </ResponsiveGridLayout>
    </>
  )
}

export default GardenGrid
