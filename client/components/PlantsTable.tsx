import { MouseEvent } from 'react'
import SecondaryButton from './SecondaryButton'
import { Link } from 'react-router-dom'
import { useGetMyPlants } from '../hooks/useHooks'
import { MyPlant } from '../../models/growGrub'

interface PlantsProps {
  id: number
  plantName: string
  plantImage: string
  plantedDate: string // or number?
  taskType: string
  lastPerformed: string // or number?
  status?: string // Optional field for status in Plant Health
  extraCare?: string // Optional field for extra care in Plant Health
  growthStatus?: string // Optional field for growth status
}

const PlantsTable: React.FC<PlantsProps> = () => {
  // Add useParams but will need to fix header and overall routing to check if this works!
  // const { id } = useParams()
  const getMyPlants = useGetMyPlants()

  if (getMyPlants.isError) {
    return (
      <>
        <p>Sorry there was an error</p>
      </>
    )
  }
  if (getMyPlants.isPending) {
    return (
      <>
        <p>Loading...</p>
      </>
    )
  }

  if (getMyPlants.data) {
    console.log(getMyPlants.data)
  }

  if (getMyPlants.data.length === 0) {
    return (
      <>
        <p className="ml-5">
          {`You haven't got any plants yet, head over to`}{' '}
          <Link to={'/my-garden'}>My Garden</Link> {` to plan your garden.`}
        </p>
      </>
    )
  }

  function getDaysUntilHarvest(days: number, datePlanted: string) {
    const dateSplit = datePlanted.split('-')
    const todaysDate = new Date()
    const plantedDate = new Date(
      Number(dateSplit[0]),
      Number(dateSplit[1]) - 1,
      Number(dateSplit[2]),
    )
    const differenceInTime = todaysDate.getTime() - plantedDate.getTime()
    const differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24))
    const timeUntilHarvest = days - differenceInDays
    return timeUntilHarvest
  }

  return (
    <div className="mx-auto max-w-7xl py-12">
      <div className="flex items-center justify-end">
        {/* <PrimaryButton
          onClick={(event: MouseEvent<Element, MouseEvent>): void => {
            throw new Error('Function not implemented.')
          }}
        >
          Add New Plant
        </PrimaryButton> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto pt-4">
        <table className="w-full">
          {/* Table header */}
          <thead>
            <tr className="bg-slate-50">
              <th className="table-header border-l border-t border-slate-200">
                My Plants
              </th>
              <th className="table-header border-t border-slate-200">
                Plant Care
              </th>
              <th className="table-header border-t border-slate-200">
                Days Until Harvest
              </th>
              <th className="table-header border-t border-slate-200">
                Plot Name
              </th>
              <th className="table-header border-r border-t border-slate-200"></th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {getMyPlants.data.map((plant: MyPlant, index: number) => (
              <tr
                key={`${plant.name}+${plant.plotsPlantsId}`}
                className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
              >
                <td className="border border-slate-200 px-4 py-2">
                  <div className="flex items-center">
                    <img
                      src={plant.iconSrc}
                      alt={plant.name}
                      className="mr-2 h-12 w-12"
                    />
                    <div className="ml-2">
                      <div className="mb-1 font-semibold">
                        <Link to={`/my-plants/${plant.name}`}>
                          {plant.name}
                        </Link>
                      </div>
                      <div className="text-gray-600">
                        Planted: {plant.datePlanted}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border border-slate-200 px-4 py-2">
                  <div className="mb-1 font-medium">Watered</div>
                  <div className="text-gray-600">
                    Last performed: {plant.lastWatered}
                  </div>
                </td>
                <td className="border border-slate-200 px-4 py-2">
                  <div className="mb-1 font-medium"></div>
                  <div className="text-left text-gray-600">
                    {getDaysUntilHarvest(
                      plant.daysUntilHarvest,
                      plant.datePlanted,
                    )}
                  </div>
                </td>
                <td className="border border-slate-200 px-4 py-2">
                  <div className="mb-1 font-medium">{plant.plotsName}</div>
                </td>
                <td className="border border-slate-200 px-4 py-2 text-right">
                  <SecondaryButton
                    onClick={(
                      event: MouseEvent<Element, globalThis.MouseEvent>,
                    ): void => {
                      throw new Error('Function not implemented.')
                    }}
                  >
                    Edit
                  </SecondaryButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PlantsTable
