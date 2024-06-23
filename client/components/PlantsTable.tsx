import { MouseEvent } from 'react'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'
import { Link, useParams } from 'react-router-dom'

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

// Mock data
const plants: PlantsProps[] = [
  {
    id: 1,
    plantName: 'Tomato',
    plantImage: '/images/flat-icons/veg-fruit-icons/tomato.png',
    plantedDate: '3 June 2022',
    taskType: 'Watering',
    lastPerformed: '3 November 2022',
    status: 'Great',
    extraCare: 'No extra care needed',
    growthStatus: 'Seedling',
  },
  {
    id: 2,
    plantName: 'Basil',
    plantImage: '/images/flat-icons/veg-fruit-icons/basil.png',
    plantedDate: '3 June 2022',
    taskType: 'Watering',
    lastPerformed: '3 November 2022',
    status: 'Good',
    extraCare: 'No extra care needed',
    growthStatus: 'Ready to Harvest',
  },
  {
    id: 3,
    plantName: 'Cauliflower',
    plantImage: '/images/flat-icons/veg-fruit-icons/cauliflower.png',
    plantedDate: '3 June 2022',
    taskType: 'Watering',
    lastPerformed: '3 November 2022',
    status: 'Poor',
    extraCare: 'Suspected disease: Bug infestation',
    growthStatus: 'Growing',
  },
]

const PlantsTable: React.FC<PlantsProps> = () => {
  // Add useParams but will need to fix header and overall routing to check if this works!
  const { id } = useParams()

  return (
    <div className="mx-auto max-w-7xl py-12">
      <div className="flex items-center justify-end">
        <PrimaryButton
          onClick={(event: MouseEvent<Element, MouseEvent>): void => {
            throw new Error('Function not implemented.')
          }}
        >
          Add New Plant
        </PrimaryButton>
      </div>

      {/* Table */}
      <div className="overflow-x-auto pt-4">
        <table className="w-full">
          {/* Table header */}
          <thead>
            <tr className="bg-slate-50">
              <th className="table-header">My Plants</th>
              <th className="table-header">Plant Care</th>
              <th className="table-header">Plant Health</th>
              <th className="table-header">Growth Status</th>
              <th className="table-header"></th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {plants.map((plant, index) => (
              <tr
                key={plant.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
              >
                <td className="border border-slate-200 px-4 py-2">
                  <div className="flex items-center">
                    <img
                      src={plant.plantImage}
                      alt={plant.plantName}
                      className="mr-2 h-12 w-12"
                    />
                    <div className="ml-2">
                      <div className="mb-1 font-semibold">
                        <Link to={`/my-plants/${plant.id}`}>
                          {plant.plantName}
                        </Link>
                      </div>
                      <div className="text-gray-600">
                        Planted: {plant.plantedDate}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="border border-slate-200 px-4 py-2">
                  <div className="mb-1 font-medium">{plant.taskType}</div>
                  <div className="text-gray-600">
                    Last performed: {plant.lastPerformed}
                  </div>
                </td>
                <td className="border border-slate-200 px-4 py-2">
                  <div className="mb-1 font-medium">{plant.status}</div>
                  <div className="text-gray-600">
                    Last performed: {plant.extraCare}
                  </div>
                </td>
                <td className="border border-slate-200 px-4 py-2">
                  <div className="mb-1 font-medium">{plant.growthStatus}</div>
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

export default SimpleTable
