import { useState } from 'react'
import type { PlotDatum } from '../../models/growGrub'
import PrimaryButton from './PrimaryButton'
import DeleteButton from './DeleteButton'
import { Layout } from 'react-grid-layout'
import { confirmAlert } from 'react-confirm-alert'
import 'react-confirm-alert/src/react-confirm-alert.css'
import PlotPlantSuggestionDropDown from './PlotPlantSuggestionDropDown'
import SmallDeleteButton from './SmallDeleteButton'

interface Props {
  plotData: PlotDatum[]
  setPlotData: React.Dispatch<React.SetStateAction<PlotDatum[]>>
  activeID: string
  onSaveGarden: () => void
  onSaveNewGarden: () => void
  layout: Layout[]
  setLayout: React.Dispatch<React.SetStateAction<Layout[]>>
  currentGardenID: number | null
}

function GardenForm({
  plotData,
  setPlotData,
  activeID,
  onSaveGarden,
  onSaveNewGarden,
  layout,
  setLayout,
  currentGardenID,
}: Props) {
  const [currentPlot, setCurrentPlot] = useState(
    plotData.find((plot) => plot.plotNumber === activeID),
  )
  const todaysDate = new Date().toISOString().split('T')[0]

  function handlePlantSelect(option: string) {
    const newPlantsArr = [
      ...currentPlot!.plants,
      {
        plantName: option,
        name: option,
        id: null,
        last_watered: null,
        date_planted: todaysDate,
      },
    ]
    const newPlot = {
      ...currentPlot!,
      plants: [...newPlantsArr],
    }
    setPlots(newPlot)
  }

  function removePlant(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()

    // const target = e.target as
    const delDetails = e.target.closest('button').id.split('-')
    if (!isNaN(Number(delDetails[1]))) {
      // if there's an id
      const newPlantsArr = currentPlot!.plants.filter(
        (plant) => plant.id !== Number(delDetails[1]),
      )
      const newPlot = {
        ...currentPlot!,
        plants: [...newPlantsArr],
      }
      setPlots(newPlot)
    } else {
      // if theres no id
      const index = currentPlot!.plants.findIndex(
        (plant) => plant.id === null && plant.plantName === delDetails[0],
      )
      const newPlantsArr = [...currentPlot!.plants]
      newPlantsArr.splice(index, 1)
      const newPlot = {
        ...currentPlot!,
        plants: [...newPlantsArr],
      }
      setPlots(newPlot)
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) {
    const value =
      isNaN(Number(e.target.value)) || e.target.value === ''
        ? e.target.value
        : Number(e.target.value)

    const newPlot = {
      ...currentPlot!,
      [e.target.name]: value,
    }
    setPlots(newPlot)
  }

  function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
    const newPlot = {
      ...currentPlot!,
      [e.target.name]: e.target.checked,
    }
    setPlots(newPlot)
  }

  function setPlots(newPlot: PlotDatum) {
    const otherPlots = plotData.filter((plot) => plot.plotNumber !== activeID)
    setCurrentPlot({ ...newPlot })
    setPlotData([...otherPlots, newPlot])
  }

  function handleDeleteButtonPush() {
    confirmAlert({
      title: `Delete ${currentPlot?.name ? `${currentPlot?.name} plot` : `plot ${activeID}`}?`,
      message: 'Are you sure, you will lose all of your plants data?',
      buttons: [
        {
          label: 'Delete',
          onClick: handleDelete,
        },
        { label: 'No, save me!' },
      ],
    })
  }

  function handleDelete() {
    const plotsWithoutDeleted = plotData.filter(
      (plot) => plot.plotNumber !== String(activeID),
    )
    const layoutWithoutDeleted = layout.filter(
      (obj) => obj.i !== String(activeID),
    )
    setPlotData([...plotsWithoutDeleted])
    setLayout([...layoutWithoutDeleted])
  }

  function handleSubmit(e: React.MouseEvent) {
    e.preventDefault()
    onSaveGarden()
  }

  function handleNewSaveGardenSubmit(e: React.MouseEvent) {
    e.preventDefault()
    onSaveNewGarden()
  }

  if (currentPlot?.blockType === 'house' && currentPlot?.growable === false) {
    return (
      <div className="garden-form">
        <form>
          {/* Name */}
          <input
            type="text"
            name="name"
            id="nameInput"
            className="text-xl font-semibold"
            value={currentPlot?.name}
            onChange={handleChange}
          />
          <br />
          {/* Type */}
          <label htmlFor="blockType">Type: </label> <br />
          <select
            value={currentPlot?.blockType}
            name="blockType"
            id="blockType"
            onChange={handleChange}
            className="dropmenu"
          >
            <option value="">No type</option>
            <option value="garden">Garden</option>
            <option value="house">House</option>
            <option value="path">Path</option>
            <option value="grass">Grass</option>
          </select>
          <br />
          <label htmlFor="growable">Could you grow food inside?</label>
          <input
            type="checkbox"
            name="growable"
            id="growable"
            checked={currentPlot.growable}
            onChange={handleCheckboxChange}
          />
          <br />
          <PrimaryButton onClick={handleSubmit}>
            Save garden & exit
          </PrimaryButton>{' '}
          {/* Conditionally render 'save as new garden' button if currentGardenID isn't null or undefined */}
          {currentGardenID && (
            <PrimaryButton onClick={handleNewSaveGardenSubmit}>
              Save as new garden
            </PrimaryButton>
          )}
        </form>
      </div>
    )
  }
  console.log(currentPlot)

  return (
    <div className="garden-form">
      <form>
        {/* Name */}
        <input
          type="text"
          name="name"
          id="nameInput"
          className="text-xl font-semibold"
          value={currentPlot?.name}
          onChange={handleChange}
        />
        <br />
        {/* Type */}
        <label htmlFor="blockType">Type: </label> <br />
        <select
          value={currentPlot?.blockType}
          name="blockType"
          id="blockType"
          onChange={handleChange}
          className="dropmenu"
        >
          <option value="">No type</option>
          <option value="garden">Garden patch</option>
          <option value="house">House</option>
          <option value="path">Path</option>
          <option value="grass">Grass</option>
        </select>
        <br />
        {currentPlot?.blockType === 'house' && (
          <>
            <label htmlFor="growable">Could you grow food inside?</label>
            <input
              type="checkbox"
              name="growable"
              id="growable"
              checked={currentPlot.growable}
              onChange={handleCheckboxChange}
            />
            <br />
          </>
        )}
        {/* Size */}
        <label htmlFor="size">Size: </label> <br />
        <select
          value={currentPlot?.size}
          name="size"
          id="size"
          onChange={handleChange}
          className="dropmenu"
        >
          <option value="">How big is it?</option>
          <option value="1">1x1</option>
          <option value="2">2x2</option>
          <option value="3">3x3</option>
          <option value="4">4x4</option>
          <option value="5">5x5</option>
        </select>{' '}
        <br />
        {/* Shade */}
        <label htmlFor="sunLight">Sun: </label> <br />
        <select
          value={currentPlot?.sunLight}
          name="sunLight"
          id="sunLight"
          onChange={handleChange}
          className="dropmenu"
        >
          <option value="">How much sun does it get?</option>
          <option value="full-shade">Mostly shade</option>
          <option value="part-sun">Half a days sun</option>
          <option value="full-sun">Always sunny</option>
        </select>{' '}
        <br />
        {/* Wind */}
        <label htmlFor="rainExposure">Rain exposure: </label> <br />
        <select
          value={currentPlot?.rainExposure}
          name="rainExposure"
          id="rainExposure"
          onChange={handleChange}
          className="dropmenu"
        >
          <option value="">How exposed is it?</option>
          <option value="undercover">Under cover</option>
          <option value="partially">Partially</option>
          <option value="fully">Fully exposed</option>
        </select>{' '}
        <br />
        <PlotPlantSuggestionDropDown
          // key={currentPlot?.sunLight}
          handlePlantSelect={handlePlantSelect}
          plotSunLevel={currentPlot?.sunLight}
        />
        <br />
        <p>Plants:</p>
        <ul>
          {currentPlot?.plants &&
            currentPlot?.plants.map((plant, index) => (
              <li key={`${plant}+${index}`}>
                {plant.name}{' '}
                <SmallDeleteButton
                  deleteId={plant.id}
                  deleteName={plant.plantName}
                  onClick={removePlant}
                />
              </li>
            ))}
        </ul>
        <PrimaryButton onClick={handleSubmit}>Save garden & exit</PrimaryButton>
        {/* Conditionally render 'save as new garden' button if currentGardenID isn't null or undefined */}
        {currentGardenID && (
          <PrimaryButton onClick={handleNewSaveGardenSubmit}>
            Save as new garden
          </PrimaryButton>
        )}
        <DeleteButton onClick={handleDeleteButtonPush}>
          Delete plot
        </DeleteButton>
      </form>
    </div>
  )
}

export default GardenForm
