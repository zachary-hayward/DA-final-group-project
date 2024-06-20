import express from 'express'
import request from 'superagent'
import 'dotenv/config'
import { GoogleGenerativeAI } from '@google/generative-ai'
// import checkJwt, { JwtRequest } from '../auth0'

const router = express.Router()
const geminiApiKey = process.env.API_KEY

router.get('/', async (req, res) => {
  console.log(111)
  // const authoId = req.auth?.sub
  if (geminiApiKey === undefined) {
    throw new Error('Missing google gemini key environment variable')
  }
  // if (!authoId) {
  //   console.log('No authoId')
  //   return res.status(401).send('Unauthorized')
  // }

  try {
    const prompt = `give me a json data about a potato that contains sunlight, watering in the form of {"data": [
    {
      "common_name": "potato",
      "life_cycle": "Herbaceous Perennial",
      "watering": "Minimum",
      "sunlight": [
        "full sun",
        "filtered shade"
      ],}]} and can you help me remove markdown`
    // Access your API key as an environment variable (see "Set up your API key" above)
    const genAI = new GoogleGenerativeAI(geminiApiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(prompt)
    const response = await result.response
    // console.log(JSON.stringify(response.candidates[0].content.parts[0].text))

    const reg = new RegExp(`\\n`, `g`)
    const text1 = response.candidates[0].content.parts[0].text

    const newStr = text1
      .replace(reg, '')
      .replace(new RegExp('```json', 'g'), '')
      .replace(new RegExp('```', 'g'), '')
      .replace(new RegExp(`\\s`, 'g'), '')
    // .replace(new RegExp(`\\`, 'g'), '')
    // console.log(newStr)

    res.json(JSON.parse(newStr))
    // res.send(newStr)
    // console.log(JSON.stringify(response))
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
      res.status(500).send((err as Error).message)
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})

export default router
