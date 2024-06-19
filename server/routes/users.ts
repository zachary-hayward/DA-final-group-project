import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'

import * as db from '../db/growGrub.ts'
import { User, UserDB } from '../../models/growGrub.ts'

const router = Router()

router.get('/users', checkJwt, async (req:JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  if (!auth0Id) return res.sendStatus(401)
  try {
    const userDB = await db.getUserByAuth0Id(auth0Id)
    if (!userDB) return res.json(userDB)
    const user: UserDB = {id: userDB.id, username: userDB.username, location: userDB.location}
    res.json(user)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.post('/users', checkJwt, async (req:JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  const userData: User = req.body
  if (!auth0Id) return res.sendStatus(401)
  if (!userData) return res.sendStatus(400)
  try {
    const userId = await db.addUser({...userData, auth0_id: auth0Id})
    res.json(userId)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

export default router