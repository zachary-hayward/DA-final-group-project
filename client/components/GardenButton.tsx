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

{
  /* <div class="mx-auto mt-10 flex max-w-7xl justify-center p-8"><a class="mx-4 flex-1" href="/my-garden"><div class="rounded-lg bg-white p-6 shadow-md transition duration-300 hover:shadow-lg"><div class="mb-4 flex items-center justify-center"><div class="mr-4 style= w-20 h-20"><img src="/images/flat-icons/spinach.png" alt="Spinach"></div><div>My Garden</div></div></div></a><a class="mx-4 flex-1" href="/my-plants"><div class="rounded-lg bg-white p-6 shadow-md transition duration-300 hover:shadow-lg"><div class="mb-4 flex items-center justify-center"><div class="mr-4 style= w-20 h-20"><img src="/images/flat-icons/carrot.png" alt="Carrot"></div><div>My Plants</div></div></div></a><a class="mx-4 flex-1" href="/my-tasks"><div class="rounded-lg bg-white p-6 shadow-md transition duration-300 hover:shadow-lg"><div class="mb-4 flex items-center justify-center"><div class="mr-4 style= w-20 h-20"><img src="/images/flat-icons/watering-can.png" alt="Watering Can"></div><div>My Tasks</div></div></div></a></div> */
}
