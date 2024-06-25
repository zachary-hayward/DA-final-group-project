import PlantsTable from '../components/PlantsTable'

export default function TaskPage() {
  return (
    <>
      {/* Page Banner - hard coded - currently WIP of componentising it */}
      <div className="banner-container h-40 flex items-center justify-center">
        <div className="mx-auto max-w-7xl text-center">
          <h2 className="banner-title">My Plants</h2>
        </div>
      </div>
      <div className="mx-auto my-20 max-w-7xl">
        <PlantsTable
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
