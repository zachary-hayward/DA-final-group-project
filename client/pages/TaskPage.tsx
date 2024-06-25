import TasksTable from '../components/TasksTable'
import Banner from '../components/Banner'
// import { useGetTasks } from '../hooks/useHooks'

export default function TaskPage() {
  // const getTasks = useGetTasks()
  // console.log('tasks page')

  // if (getTasks.data) {
  //   console.log('getTasks.data: ', getTasks.data)
  // }
  return (
    <>
      {/* Page Banner - hard coded - currently WIP of componentising it */}
      <Banner
        bannerInfo={{
          title: 'My Tasks',
        }}
      />

      <div className="mb-20 mt-10">
        <TasksTable
          id={0}
          plantName={''}
          plantImage={''}
          plantedDate={''}
          taskType={''}
          lastPerformed={''}
        />
      </div>
    </>
  )
}
