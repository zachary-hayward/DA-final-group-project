import { MouseEvent } from 'react'
import PrimaryButton from './PrimaryButton'
import SecondaryButton from './SecondaryButton'
import {
  useGetTasks,
  useGetTestTasks,
  useGetUpdatedTasks,
} from '../hooks/useHooks'

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
  // const getTasks = useGetUpdatedTasks()
  const testTaskQuery = useGetTestTasks()

  // console.log(testTasks)

  if (testTaskQuery.isError) return <p>error</p>

  if (testTaskQuery.isPending) return <p>loading</p>

  // if (getTasks.data) {
  //   console.log('getTasks.data: ', getTasks.data)
  // }

  if (testTaskQuery.data) {
    console.log('getTestTasks.data: ', testTaskQuery.data)
  }

  const testTasks = testTaskQuery.data

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
        <table className="table-auto">
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
            {testTasks.map((task, index) => (
              <tr
                key={`tasktablerow${task.id}`}
                className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
              >
                <td className="container flex flex-grow items-center border border-slate-200 px-4 py-2">
                  <div className="flex h-full flex-grow items-center">
                    <img
                      src={task.icon_src}
                      alt={task.name}
                      className="mr-2 h-12 w-12"
                    />
                  </div>
                  <div className="ml-2">
                    <div className="mb-1 font-semibold">{task.name}</div>
                    <div className="text-gray-600">
                      Planted: {task.date_planted}
                    </div>
                  </div>
                </td>
                <td className="border border-slate-200 px-4 py-2">
                  <div className="mb-1 font-medium">
                    {task.type == 'water'
                      ? 'Watering'
                      : 'Task type not recognised'}
                  </div>
                  <div className="text-gray-600">
                    Last watered: {String(task.last_watered)}
                  </div>
                  {task.overdue_by > 0 ? (
                    <div className="text-gray-600">
                      Overdue by {String(task.overdue_by)}{' '}
                      {task.overdue_by == 1 ? 'day!' : 'days!'}
                    </div>
                  ) : null}
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
