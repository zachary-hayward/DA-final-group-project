import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'

import * as db from '../db/growGrub.ts'
import { UserData, User, NewPlant } from '../../models/growGrub.ts'
import { differentiatePlots } from '../db/helperFunctions.tsx'

const router = Router()

//Used to check user exists
router.get('/users', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  if (!auth0Id) return res.sendStatus(401)
  try {
    const userDB = await db.getUserByAuth0Id(auth0Id)
    if (!userDB) return res.json(userDB)
    const user: User = {
      id: userDB.id,
      username: userDB.username,
      location: userDB.location,
    }
    res.json(user)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})
//For registering a new user
router.post('/users', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  const userData: UserData = req.body
  if (!auth0Id) return res.sendStatus(401)
  if (!userData) return res.sendStatus(400)
  try {
    const userId = await db.addUser({ ...userData, auth0_id: auth0Id })
    res.json(userId)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})
//Gets all usernames to help the registering user avoid double ups on usernames (unique in DB) NOT IN USE
router.get('/usernames', async (req, res) => {
  try {
    const usernames = await db.getUsernames()
    const list: string[] = []
    usernames.forEach((row) => list.push(row.username))
    res.json(list)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})
//Gets all plants NOT IN USE
router.get('/plants', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  if (!auth0Id) return res.sendStatus(401)
  try {
    const plants = await db.getPlants()
    res.json(plants)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})
//Gets all plants the user desires for their garden(s) NOT IN USE
router.get('/plants/desired', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  if (!auth0Id) return res.sendStatus(401)
  try {
    const plants = await db.getUsersPlantsDesired(auth0Id)
    res.json(plants)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})
//Get the users gardens NOT IN USE
router.get('/gardens', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  if (!auth0Id) return res.sendStatus(401)
  try {
    const gardens = await db.getUsersGardens(auth0Id)
    const plots = await db.getAllUsersPlots(auth0Id)
    res.json({ gardens, plots })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})
//Gets plots + plants for the garden NOT IN USE
router.get('/gardens/:id', checkJwt, async (req: JwtRequest, res) => {
  const id = Number(req.params.id)
  const auth0Id = req.auth?.sub
  if (!auth0Id) return res.sendStatus(401)
  try {
    const gardenInfoDB = await db.getUserGarden(auth0Id, id)
    const plotsDB: any[] = [] // eslint-disable-line
    gardenInfoDB.forEach((row) => {
      if (row.plot_plant_id) {
        plotsDB[row.plot_id] = plotsDB[row.plot_id] || {}
        plotsDB[row.plot_id].plotNumber = row.plot_number
        plotsDB[row.plot_id].shadeLevel = row.shade_level
        plotsDB[row.plot_id].plotType = row.plot_type
        plotsDB[row.plot_id].size = row.size
        plotsDB[row.plot_id].averageWind = row.average_wind
        plotsDB[row.plot_id].name = row.plot_name
        plotsDB[row.plot_id].plants = plotsDB[row.plot_id].plants || []
        plotsDB[row.plot_id].plants.push({
          name: row.plant_name,
          difficulty: row.difficulty,
          wateringFrequency: row.watering_frequency,
          datePlanted: row.date_planted,
          lastWatered: row.last_watered,
        })
      }
    })
    const plots = plotsDB.filter((item) => item)
    const garden = {
      id: gardenInfoDB[0].garden_id,
      layout: gardenInfoDB[0].layout,
      plots: plots,
    }
    res.json(garden)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

// Add new garden
router.post('/gardens', checkJwt, async (req: JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  if (!auth0Id) return res.sendStatus(401)
  const user = await db.getUserByAuth0Id(auth0Id)
  try {
    const newGarden = req.body
    const layoutString = JSON.stringify(newGarden.layout)
    const newGardenID = await db.saveNewGarden(layoutString, user.id)
    const newPlotIDs = await db.saveNewPlots(newGarden.plotData, newGardenID[0])

    // map over plotData so that each plant object inside the plants array includes it's plant_id
    // will need a new databse function getPlantIdByName

    const newPlants = await db.saveNewPlotPlants(
      newPlotIDs,
      newGarden.plotData,
      user.id,
    )

    //need user id + plant id of each plant
    console.log(newPlotIDs)
    console.log(newGarden.plotData)

    // create a db function to save plants
    res.json({ newGardenID, newPlotIDs })
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

// Router for adding new plots - NOT IN USE, ONLY FOR TESTING
// router.post('/plots', async (req, res) => {
//   try {
//     const newPlots = req.body
//     const newPlotIDs = await db.saveNewPlots(newPlots, 1)
//     res.json(newPlotIDs)
//   } catch (error) {
//     console.log(error)
//     res.sendStatus(500)
//   }
// })

// Router used for updating existing garden
router.put('/gardens/:id', checkJwt, async (req: JwtRequest, res) => {
  // Body of request will include plotData, layout
  const garden_id = Number(req.params.id)
  const auth0Id = req.auth?.sub
  if (!auth0Id) return res.sendStatus(401)
  const user = await db.getUserByAuth0Id(auth0Id)

  try {
    const updatedGarden = req.body
    const updatedLayoutString = JSON.stringify(updatedGarden.layout)

    await db.updateGardenLayout(garden_id, updatedLayoutString)

    const updatedPlotData = updatedGarden.plotData
    const existingPlotData = await db.getPlotsByGardenID(garden_id)

    const { plotsToCreate, plotsToUpdate, plotIDsToDelete } =
      differentiatePlots(updatedPlotData, existingPlotData, garden_id)

    await db.updatePlots(plotsToUpdate, garden_id)
    const newPlotIDs = await db.saveNewPlots(plotsToCreate, garden_id)
    if (newPlotIDs.length > 0) {
      await db.saveNewPlotPlants(newPlotIDs, plotsToCreate, user.id)
    }
    await db.deletePlotsByID(plotIDsToDelete)

    // get an array of all plants not in db (w/o id's)
    const plantsToInsert: NewPlant[] = []
    if (plotsToUpdate.length > 0) {
      plotsToUpdate.forEach((plot) => {
        if (plot.plants.length > 0) {
          plot.plants.forEach((plant) => {
            if (plant.id) return
            else {
              const newPlant = {
                plant_id: 1,
                user_id: user.id,
                plot_id: plot.id,
                date_planted: plant.date_planted,
                name: plant.name,
              }
              plantsToInsert.push(newPlant)
            }
          })
        }
      })
      if (plantsToInsert.length > 0) {
        db.saveNewPlants(plantsToInsert)
      }
    }

    res
      .json({
        message: `Garden ${garden_id} was successfully updated in the database.`,
      })
      .status(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

export default router
