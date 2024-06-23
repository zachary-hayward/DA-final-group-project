import { GardenSimpleDB } from '../../models/growGrub'
import GardenButton from './GardenButton'

interface Props {
  gardenData: GardenSimpleDB[]
  switchSelectedGarden: (id: number) => void
}

function GardenSelect({ gardenData, switchSelectedGarden }: Props) {
  return (
    <div>
      {gardenData.map((garden: GardenSimpleDB) => (
        <GardenButton
          key={`${garden.id}+++${garden.user_id}`}
          garden={garden}
          switchSelectedGarden={switchSelectedGarden}
        />
      ))}
    </div>
  )
}

export default GardenSelect
