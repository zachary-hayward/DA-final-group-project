import { Router } from 'express'
import checkJwt, { JwtRequest } from '../auth0.ts'

import * as db from '../db/growGrub.ts'

const router = Router()

router.get('/users', checkJwt, (req:JwtRequest, res) => {
  const auth0Id = req.auth?.sub
  if (!auth0Id) return res.sendStatus(401)
  try {
    const user = db.getUserByAuth0Id(auth0Id)
    res.json(user)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export default router