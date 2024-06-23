import { MouseEvent } from 'react'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

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
    status: 'Good',
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
    status: 'Good',
    extraCare: 'Suspected disease: Bug infestation',
    growthStatus: 'Growing',
  },
]

const SimpleTable: React.FC<PlantsProps> = () => {
  return (
    <div className="list-container mx-auto py-12">
      <div className="flex items-center justify-end">
        {' '}
        {/* justify-end instead of justify-between */}
        <PrimaryButton
          onClick={(event: MouseEvent<Element, MouseEvent>): void => {
            throw new Error('Function not implemented.')
          }}
          style={{ marginRight: '0' }} // optional: to adjust spacing from right edge
        >
          Add New Plant
        </PrimaryButton>
      </div>

      {/* Table */}
      <div className="overflow-x-auto pt-4">
        <table>
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
                Plant Health
              </th>
              <th className="table-header border-t border-slate-200">
                Growth Status
              </th>
              <th className="table-header border-r border-t border-slate-200"></th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {plants.map((plant, index) => (
              <tr
                key={plant.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
              >
                <td className="flex items-center border border-slate-200 px-4 py-2">
                  <div className="flex items-center">
                    <img
                      src={plant.plantImage}
                      alt={plant.plantName}
                      className="mr-2 h-12 w-12"
                    />
                  </div>
                  <div className="ml-2">
                    <div className="mb-1 font-semibold">{plant.plantName}</div>
                    <div className="text-gray-600">
                      Planted: {plant.plantedDate}
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
                <td className="w-1/12 border border-slate-200 px-4 py-2 text-right">
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
