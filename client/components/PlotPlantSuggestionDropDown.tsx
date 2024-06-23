// import { useState } from 'react'
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

  const userSummerStartMonth = 'september'

  const dateNow = new Date()
  const currentMonthIndex = dateNow.getMonth()

  // - ask gemeni when summer starts for the users location then do maths
  const months = [
    'january',
    'febuary',
    'march',
    'april',
    'may',
    'june',
    'july',
    'august',
    'september',
    'october',
    'november',
    'december',
  ]

  // figure out current season
  const seasons = [
    'early-summer',
    'summer',
    'late-summer',
    'early-autumn',
    'autumn',
    'late-autumn',
    'early-winter',
    'winter',
    'late-winter',
    'early-spring',
    'spring',
    'late-spring',
  ]

  // to figure out what the current season is we need to take the index of the users summer month, and then move it
  const indexOfSummerMonth = months.findIndex(
    (month) => month === userSummerStartMonth.toLowerCase(),
  )
  const numMonthsSinceEarlySummer = getMonthsSinceEarlySummer(
    indexOfSummerMonth,
    currentMonthIndex,
  )
  console.log(indexOfSummerMonth)
  console.log('months since: ', numMonthsSinceEarlySummer)
  function getMonthsSinceEarlySummer(
    summerStartIndex: number,
    currMonthIndex: number,
  ) {
    if (currMonthIndex < summerStartIndex) {
      return currMonthIndex + 1 + (11 - summerStartIndex)
    }
    if (currMonthIndex === summerStartIndex) {
      return 0
    }
    if (currMonthIndex > summerStartIndex) {
      return currMonthIndex - summerStartIndex
    }
  }

  const currentSeason = seasons[numMonthsSinceEarlySummer!]
  const nextSeasonPhase = seasons[numMonthsSinceEarlySummer! + 1]
    ? seasons[numMonthsSinceEarlySummer! + 1]
    : seasons[0]

  // FILTER
  let plantSuggestions: string[] = []
  let otherPlantSuggestions: string[] = []
  if (plantsQuery.data) {
    const filteredBySun = plantsQuery.data.filter(
      (plant: Plant) =>
        plant.sun_level.includes(plotSunLevel!) || plotSunLevel === undefined,
    )
    const filteredBySeason = filteredBySun.filter(
      (plant) =>
        plant.planting_starts.toLowerCase() === 'year-round' ||
        plant.planting_starts.toLowerCase().includes(currentSeason) ||
        plant.planting_starts.toLowerCase().includes(nextSeasonPhase),
    )
    plantSuggestions = filteredBySeason.map((plant: Plant) => plant.name)
    otherPlantSuggestions = plantsQuery.data
      .filter((plant) => !plantSuggestions.includes(plant.name))
      .map((plant: Plant) => plant.name)
  }

  return (
    <>
      <p>Recommended plants:</p>
      <DropDownAutoFilter
        options={plantSuggestions}
        onSelect={handlePlantSelect}
        containerClass={
          'container absolute w-full border-b-[1px] border-t-[1px]  border-l-[1px] border-r-[1px] border-black bg-white rounded'
        }
      />
      <p>Other plants:</p>
      <DropDownAutoFilter
        options={otherPlantSuggestions}
        onSelect={handlePlantSelect}
        containerClass={
          'container absolute w-full border-b-[1px] border-t-[1px]  border-l-[1px] border-r-[1px] border-black bg-white rounded'
        }
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
