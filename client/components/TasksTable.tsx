import { MouseEvent } from 'react'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'

interface TaskProps {
  id: number
  plantName: string
  plantImage: string
  plantedDate: string // or number?
  taskType: string
  lastPerformed: string // or number?
}

//mockData
const tasks: TaskProps = [
  {
    id: 1,
    plantName: 'Tomato',
    plantImage: '/images/flat-icons/veg-fruit-icons/tomato.png',
    plantedDate: '3 November 2022',
    taskType: 'Watering',
    lastPerformed: '4 December 2023',
  },
  {
    id: 2,
    plantName: 'Basil',
    plantImage: '/images/flat-icons/veg-fruit-icons/basil.png',
    plantedDate: '3 November 2022',
    taskType: 'Watering',
    lastPerformed: '4 December 2023',
  },
  {
    id: 3,
    plantName: 'Cauliflower',
    plantImage: '/images/flat-icons/veg-fruit-icons/cauliflower.png',
    plantedDate: '3 November 2022',
    taskType: 'Watering',
    lastPerformed: '4 December 2023',
  },
]

const TaskTable: React.FC<TaskProps> = ({
  id,
  plantName,
  plantImage,
  plantedDate,
  taskType,
  lastPerformed,
}) => {
  return (
    <div className="list-container mx-auto py-12">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-medium">Watering</div>
        <PrimaryButton
          onClick={(event: MouseEvent<Element, MouseEvent>): void => {
            throw new Error('Function not implemented.')
          }}
        >
          Complete All Tasks
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
                Task Type
              </th>
              <th className="table-header border-r border-t border-slate-200"></th>
            </tr>
          </thead>

          {/* Table body */}
          <tbody>
            {tasks.map((task, index) => (
              <tr
                key={task.id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
              >
                <td className="flex items-center border border-slate-200 px-4 py-2">
                  <div className="flex items-center">
                    <img
                      src={task.plantImage}
                      alt={task.plantName}
                      className="mr-2 h-12 w-12"
                    />
                  </div>
                  <div className="ml-2">
                    <div className="mb-1 font-semibold">{task.plantName}</div>
                    <div className="text-gray-600">
                      Planted: {task.plantedDate}
                    </div>
                  </div>
                </td>
                <td className="border border-slate-200 px-4 py-2">
                  <div className="mb-1 font-medium">{task.taskType}</div>
                  <div className="text-gray-600">
                    Last watered: {task.lastPerformed}
                  </div>
                </td>
                <td className="w-1/12 border border-slate-200 px-4 py-2 text-right">
                  <SecondaryButton
                    onClick={(
                      event: MouseEvent<Element, globalThis.MouseEvent>,
                    ): void => {
                      throw new Error('Function not implemented.')
                    }}
                  >
                    Done
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

export default TaskTable
