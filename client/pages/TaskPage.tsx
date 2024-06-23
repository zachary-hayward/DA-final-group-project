import TasksTable from '../components/TasksTable'

export default function TaskPage() {
  return (
    <>
      {/* Page Banner - hard coded - currently WIP of componentising it */}
      <div className="banner-container">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="banner-title">My Tasks</h2>
        </div>
      </div>
      <div className="my-20">
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
