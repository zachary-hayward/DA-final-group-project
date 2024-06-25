import Banner from '../components/Banner'
import PlantsTable from '../components/PlantsTable'

export default function TaskPage() {
  return (
    <>
      <Banner 
        bannerInfo={{
          title: "My Plants"
        }}
      />
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
