interface BannerInfo {
  title: string
  subtitle?: string
  description?: string
  imgURL?: string
}

interface Props {
  bannerInfo: BannerInfo
}

export default function Banner({bannerInfo}: Props) {
  
  let banner

  if (!bannerInfo.title) {
    throw new Error("Missing banner info: title")
  }
  if (typeof(bannerInfo.title) == "string" && typeof(bannerInfo.subtitle) == "string" && typeof(bannerInfo.description) == "string")
    {
      banner = (
        <div className="bg-lime-200 p-8 px-4">
              <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-center">
                  <div className="flex-1">
                    <h2 className="gray-800 text-4xl font-bold">
                      {bannerInfo.title}
                    </h2>
                    <h3 className="py-3 text-xl italic text-gray-800">
                      {bannerInfo.subtitle}
                    </h3>
                    <div className="mt-4 w-full resize-y md:max-w-xl">
                      <p className="text-lg text-gray-800">
                        {bannerInfo.description}
                      </p>
                    </div>
                  </div>
                  <div className="ml-8 flex-shrink-0">
                    <img
                      src={bannerInfo.imgURL}
                      alt={bannerInfo.title}
                      className="h-50 w-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
      )
    } else if (typeof(bannerInfo.title) == "string") {
      banner = (
        <div className="flex items-center  bg-lime-200 justify-center p-8 px-4">      
            <div className="flex py-6 px-6">
                    <h1 className="text-3xl lg:text-4xl font-semibold text-green-800 dark:text-green text-center justify-center relative">
                      {bannerInfo.title}
                    </h1>
                </div>
        </div>
      )
    }
  return banner
}