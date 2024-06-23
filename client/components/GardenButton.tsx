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
      className="inline-flex items-center rounded-md bg-green-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={handleClick}
    >
      Garden name here {garden.id}
    </button>
  )
}

export default GardenButton
