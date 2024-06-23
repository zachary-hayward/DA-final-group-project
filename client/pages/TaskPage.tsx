export default function TaskPage() {
  return (
    <>
      {/* Page Banner - hard coded - currently WIP of componentising it */}
      <div>
        <div className="banner-container">
          <div className="mx-auto max-w-7xl">
            <div className="banner-flex">
              <div className="flex-1">
                <h2 className="banner-title">{plantData.plantName}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
