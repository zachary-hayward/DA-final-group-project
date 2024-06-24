export default function LandingPageExisitingUser() {
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
          <h2 className="text-4xl font-bold">
            Transform your gardening experience with tools tailored for veggie
            enthusiasts like you.
          </h2>
        </div>
      </div>
    </>
  )
}
