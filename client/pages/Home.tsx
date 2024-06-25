import QuickLinksCards from '../components/QuicklinksCard'
import spinachIcon from '/images/flat-icons/spinach.png'
import carrotIcon from '/images/flat-icons/carrot.png'
import wateringCanIcon from '/images/flat-icons/watering-can.png'
import TaskTable from '../components/TasksTable'
import Banner from "../components/Banner"

export default function Home() {
  return (
    <>
      <div
        className="banner-container relative flex h-96 items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/homepage/Homepage_banner_bg.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 mx-auto max-w-3xl text-center text-white">
          <h2 className="text-4xl font-bold leading-snug">
            Transform your gardening experience with tools tailored for veggie
            enthusiasts like you.
          </h2>
        </div>
      </div>
      <div className="mx-auto mt-10 flex max-w-7xl justify-center p-8">
        <QuickLinksCards
          icon={<img src={spinachIcon} alt="Spinach"/>}
          text={'My Garden'}
          link={'/my-garden'}
        />
        <QuickLinksCards
          icon={<img src={carrotIcon} alt="Carrot"/>}
          text={'My Plants'}
          link='/my-plants'
        />
        <QuickLinksCards
          icon={<img src={wateringCanIcon} alt="Watering Can"/>}
          text={'My Tasks'}
          link={'/my-tasks'}
        />
      </div>
      <div className="mt-10 mb-20">
        <div className="list-container mx-auto max-w-7xl">
        <h3 className="font-bold text-3xl">Today's Tasks</h3>
        <TaskTable id={0} title={''} content={''} />
      </div>
      </div>
    </>
  )
}



