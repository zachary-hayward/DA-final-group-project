import { useState } from 'react'
import { useHooks } from '../hooks/useHooks'
import DropDownAutoFilter from './DropDownAutoFilter'
import { Plant } from '../../models/growGrub'

interface Props {
  handlePlantSelect: () => void
  plotSunLevel: undefined | string
}

function PlotPlantSuggestionDropDown({
  handlePlantSelect,
  plotSunLevel,
}: Props) {
  // const [plantSuggestions, setPlantSuggestions] = useState<string[]>([])
  const hooks = useHooks()
  const plantsQuery = hooks.getPlants()

  // get current date
  const dateNow = new Date()
  console.log(dateNow)

  // align with season

  // filter vegetables by sun_level
  let plantSuggestions: string[] = []
  if (plantsQuery.data) {
    const filteredBySun = plantsQuery.data.filter(
      (plant: Plant) => plant.sun_level === plotSunLevel,
    )
    plantSuggestions = filteredBySun.map((plant: Plant) => plant.name)
    // setPlantSuggestions(strings)
  }
  return (
    <>
      <DropDownAutoFilter
        options={plantSuggestions}
        onSelect={handlePlantSelect}
        containerClass={``}
      />
    </>
  )
}

// ADD PLANTS TO PLOT

// RECOMMENDED PLANTS - OTHERS

// Use Zacs drop down to let users choose from their desired plants first

// it should also suggest plants that require that amount of sunlight - and plants that should be planted at that time of year

// then, all the other plants that exist

// If a plant is added it needs to be stored in some sort of state

// When the garden is saved

export default PlotPlantSuggestionDropDown
