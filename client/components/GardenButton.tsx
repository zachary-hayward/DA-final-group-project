import { GardenSimpleDB } from '../../models/growGrub'

interface Props {
  garden: GardenSimpleDB
  switchSelectedGarden: (id: number) => void
}

function GardenButton({ garden, switchSelectedGarden }: Props) {
  function handleClick() {
    switchSelectedGarden(garden.id)
  }

  return (
    <button
      type="button"
      className="ml-3 rounded-lg  bg-green-700 p-6  text-sm font-semibold text-white shadow-md transition duration-300 hover:bg-green-800 hover:shadow-lg focus-visible:outline-indigo-600"
      onClick={handleClick}
    >
      Garden {garden.id} 🌱
    </button>
  )
}

export default GardenButton
