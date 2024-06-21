export default function InstructionListItem() {
  return (
    <div>
      <div className="mx-auto max-w-4xl px-10 py-8">
        <h3 className="pb-2 text-xl font-bold">Care instructions</h3>
        <div className="grid grid-cols-12 items-center gap-4 rounded-lg bg-slate-50 px-6 py-4">
          <div className="col-span-1">
            <img
              className="h-12 w-12"
              src="/images/flat-icons/soil.png"
              alt={plantData.plantName}
            />
          </div>
          <div className="col-span-11">
            <h4 className="text-lg font-bold text-green-800">Soil </h4>
            <p className="text-base text-green-800">
              {plantData.careInstructions.soil}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
