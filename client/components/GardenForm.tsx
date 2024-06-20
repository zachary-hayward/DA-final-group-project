import { useState } from 'react'

type BlockDatum = {
  layoutId: string
  name: string
  sunLight: number
  occupation: number
  blockType: string
  size: string
  shade: number
  wind: string
}

interface Props {
  blockData: BlockDatum[]
  setBlockData: React.Dispatch<React.SetStateAction<BlockDatum[]>>
  activeID: string
}

function GardenForm({ blockData, setBlockData, activeID }: Props) {
  const [currentBlock, setCurrentBlock] = useState(
    blockData.find((block) => block.layoutId === activeID),
  )

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = isNaN(Number(e.target.value))
      ? e.target.value
      : Number(e.target.value)

    const newBlock = {
      ...currentBlock!,
      [e.target.name]: value,
    }
    console.log(newBlock)
    setCurrentBlock({ ...newBlock })

    const otherBlocks = blockData.filter((block) => block.layoutId !== activeID)
    setBlockData([...otherBlocks, newBlock])
  }

  return (
    <div className="garden-form">
      <h2 className="text-xl font-semibold">Patch details</h2>
      <form>
        {/* Type */}
        <label htmlFor="blockType">Type: </label> <br />
        <select
          value={currentBlock?.blockType}
          name="blockType"
          id="blockType"
          onChange={handleChange}
          className="dropmenu"
        >
          <option value="">No type</option>
          <option value="garden">Garden patch</option>
          <option value="house">House</option>
          <option value="Path">Path</option>
          <option value="Grass">Grass</option>
        </select>
        <br />
        {/* Size */}
        <label htmlFor="size">Size: </label> <br />
        <select
          value={currentBlock?.size}
          name="size"
          id="size"
          onChange={handleChange}
          className="dropmenu"
        >
          <option value="">How big is it?</option>
          <option value="1x1">1x1</option>
          <option value="2x2">2x2</option>
          <option value="3x3">3x3</option>
          <option value="4x4">4x4</option>
        </select>{' '}
        <br />
        {/* Shade */}
        <label htmlFor="shade">Sun: </label> <br />
        <select
          value={currentBlock?.shade}
          name="shade"
          id="shade"
          onChange={handleChange}
          className="dropmenu"
        >
          <option value="">How much sun does it get?</option>
          <option value="1">Always sunny</option>
          <option value="2">It gets a lot of sun</option>
          <option value="3">Half a days sun</option>
          <option value="4">Pretty shady</option>
          <option value="5">Fully shaded</option>
        </select>{' '}
        <br />
        {/* Wind */}
        <label htmlFor="wind">Wind: </label> <br />
        <select
          value={currentBlock?.wind}
          name="wind"
          id="wind"
          onChange={handleChange}
          className="dropmenu"
        >
          <option value="">How much sun does it get?</option>
          <option value="1">Always sunny</option>
          <option value="2">It gets a lot of sun</option>
          <option value="3">Half a days sun</option>
          <option value="4">Pretty shady</option>
          <option value="5">Fully shaded</option>
        </select>{' '}
        <br />
        {/* Occupation */}
        <label htmlFor="occupation">Occupation: </label> <br />
        <select
          value={currentBlock?.occupation}
          name="occupation"
          id="occupation"
          onChange={handleChange}
          className="dropmenu"
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
        </select>{' '}
        <br />
      </form>
    </div>
  )
}

export default GardenForm
