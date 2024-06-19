import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'

import * as db from '../db/growGrub.ts'
import { UserDB } from '../../models/growGrub.ts'

const router = Router()

router.get('/users', checkJwt, async (req:JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  console.log(req.auth)
  if (!auth0Id) return res.sendStatus(401)
  try {
    const userDB = await db.getUserByAuth0Id(auth0Id)
    const user: UserDB = {id: userDB.id, username: userDB.username, location: userDB.location}
    res.json(user)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export default router