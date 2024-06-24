import { MouseEvent } from 'react'
import PrimaryButton from '../components/PrimaryButton'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <>
      <div
        className="banner-container relative flex h-96 items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `url('/images/homepage/Homepage_banner_bg.png')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="mx-auto max-w-7xl text-left text-white">
          <h2 className="text-4xl font-bold">
            Transform your gardening experience with tools tailored for veggie
            enthusiasts like you.
          </h2>
        </div>
      </div>
      <div className="h-30 image-center mx-auto w-20 justify-center pb-5 pt-8">
        <img src="/images/homepage/pot_shove_icon.png" alt="plant shovel" />
      </div>
      <div className="pb-3 text-center">
        <h2 className="text-xl text-green-700">
          Oh! You haven't setup your garden yet!
        </h2>
        <p className="text-base text-green-700">
          It's time to start planting and growing your favourite vegetables.
          Create your first garden and watch your green paradise come to life!
        </p>
      </div>
      <div className="pb-5 text-center">
        {/* Link to Register page */}
        <Link to="/register">
          <PrimaryButton
            onClick={function (event: MouseEvent<Element, MouseEvent>): void {
              throw new Error('Function not implemented.')
            }}
            children={'Register now'}
          />
        </Link>
      </div>
    </>
  )
}
