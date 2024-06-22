import { GardenSimpleDB } from '../../models/growGrub'
import GardenButton from './GardenButton'

interface Props {
  gardenData: GardenSimpleDB[]
  setCurrentGardenID: React.Dispatch<React.SetStateAction<number | undefined>>
}

function GardenSelect({ gardenData, setCurrentGardenID }: Props) {
  return (
    <div>
      {gardenData.map((garden: GardenSimpleDB) => (
        <GardenButton
          key={`${garden.id}+++${garden.user_id}`}
          garden={garden}
          setCurrentGardenID={setCurrentGardenID}
        />
      ))}
    </div>
  )
}

export default GardenSelect
