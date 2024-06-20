import { useState } from 'react'

type BlockDatum = {
  layoutId: string
  name: string
  sunLight: number
  occupation: number
}

interface Props {
  blockData: BlockDatum[]
  setBlockData: React.Dispatch<React.SetStateAction<BlockDatum[]>>
  activeID: string
}

function GardenForm({ blockData, setBlockData, activeID }: Props) {
  // the current blockData = activeID
  const [currentBlock, setCurrentBlock] = useState(
    blockData.find((block) => block.layoutId === activeID),
  )

  // need to rerender this component when the activeID changes

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const newBlock = { ...currentBlock!, occupation: Number(e.target.value) }
    setCurrentBlock({ ...newBlock })

    const otherBlocks = blockData.filter((block) => block.layoutId !== activeID)
    setBlockData([...otherBlocks, newBlock])
  }

  return (
    <div className="garden-form">
      <form>
        <label htmlFor="type">Block type</label>

        <label htmlFor="occupation">Occupation</label>
        <select
          value={currentBlock?.occupation}
          name="occupation"
          id="occupation"
          onChange={handleChange}
        >
          <option value="">--Empty?--</option>
          <option value="10">10%</option>
          <option value="20">20%</option>
          <option value="30">30%</option>
          <option value="40">40%</option>
          <option value="50">50%</option>
          <option value="60">60%</option>
          <option value="70">70%</option>
          <option value="80">80%</option>
          <option value="90">90%</option>
          <option value="100">100%</option>
        </select>
      </form>
    </div>
  )
}

export default GardenForm
