import { GardenSimpleDB } from '../../models/growGrub'
import GardenButton from './GardenButton'

interface Props {
  gardenData: GardenSimpleDB[]
  switchSelectedGarden: (id: number) => void
}

function GardenSelect({ gardenData, switchSelectedGarden }: Props) {
  return (
    <div className="mx-auto mt-10 flex max-w-7xl flex-col justify-center p-8">
      <br />
      <div className="flex flex-row justify-center	">
        {gardenData.map((garden: GardenSimpleDB) => (
          <GardenButton
            key={`${garden.id}+++${garden.user_id}`}
            garden={garden}
            switchSelectedGarden={switchSelectedGarden}
          />
        ))}
      </div>
    </div>
  )
}

export default GardenSelect
