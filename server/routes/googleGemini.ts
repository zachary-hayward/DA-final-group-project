import express from 'express'
import request from 'superagent'
import 'dotenv/config'
import { GoogleGenerativeAI } from '@google/generative-ai'
import checkJwt, { JwtRequest } from '../auth0'

const router = express.Router()
const geminiApiKey = process.env.API_KEY

router.get('/', checkJwt, async (req: JwtRequest, res) => {
  console.log(111)
  const authoId = req.auth?.sub
  if (geminiApiKey === undefined) {
    throw new Error('Missing google gemini key environment variable')
  }
  if (!authoId) {
    console.log('No authoId')
    return res.status(401).send('Unauthorized')
  }

  try {
    const prompt = `give me json data with whitespacing between each word about plant care information about strawberries that contains plant care information, watering with one of three properties: low, medium or high, time should be the season with the seed planting months in New Zealand, spacing in metres, in the form of {
"plantCareData": [
  {
    "plantName": str,
    "scientificName": str,
    "description": " ",
    "careInstructions": {
        "soil": str,
        "sunlight": str
        "watering": str,
        "fertilization": str,
        "pruning": str,
        "pests": str,
        "diseases": str
    },
    "plantingTime": {
        "indoors": "Start seeds indoors 6-8 weeks before the last frost date in your area.",
        "outdoors": "Transplant seedlings outdoors after all danger of frost has passed and soil temperatures are consistently above 55°F (13°C).",,
        "spacing": str,
        "time": [str],
    },
    "harvesting": {
        "time": str,
        "tips": str
    }
}
  ]
} and for each property, keep the strings short please and with spacing between words`
    const genAI = new GoogleGenerativeAI(geminiApiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(prompt)
    const response = await result.response
    // console.log(JSON.stringify(response.candidates[0].content.parts[0].text))

    const reg = new RegExp(`\\n`, `g`)
    const text1 = response.candidates[0].content.parts[0].text

    const newStr = text1
      .replace(reg, '')
      .replace(new RegExp('```json', 'g'), ' ')
      .replace(new RegExp('```', 'g'), ' ')
      .replace(new RegExp(`\\s`, 'g'), ' ')

    res.json(JSON.parse(newStr))
    // console.log(JSON.stringify(response.candidates))
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
      res.status(500).send((err as Error).message)
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})

router.post('/', checkJwt, async (req: JwtRequest, res) => {
  console.log(111)
  const authoId = req.auth?.sub
  if (geminiApiKey === undefined) {
    throw new Error('Missing google gemini key environment variable')
  }
  if (!authoId) {
    console.log('No authoId')
    return res.status(401).send('Unauthorized')
  }

  try {
    const vege = req.body.prompt
    const prompt = `give me json data with whitespacing between each word about plant care information about strawberries that contains plant care information, watering with one of three properties: low, medium or high, time should be the season with the seed planting months in New Zealand, spacing in metres, in the form of {
"plantCareData": [
  {
    "plantName": str,
    "scientificName": str,
    "description": " ",
    "careInstructions": {
        "soil": str,
        "sunlight": str
        "watering": str,
        "fertilization": str,
        "pruning": str,
        "pests": str,
        "diseases": str
    },
    "plantingTime": {
        "indoors": "Start seeds indoors 6-8 weeks before the last frost date in your area.",
        "outdoors": "Transplant seedlings outdoors after all danger of frost has passed and soil temperatures are consistently above 55°F (13°C).",,
        "spacing": str,
        "time": [str],
    },
    "harvesting": {
        "time": str,
        "tips": str
    }
}
  ]
} and for each property, keep the strings short please and with spacing between words`
    const genAI = new GoogleGenerativeAI(geminiApiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
    const result = await model.generateContent(prompt)
    const response = await result.response
    // console.log(JSON.stringify(response.candidates[0].content.parts[0].text))

    const reg = new RegExp(`\\n`, `g`)
    const text1 = response.candidates[0].content.parts[0].text

    const newStr = text1
      .replace(reg, '')
      .replace(new RegExp('```json', 'g'), ' ')
      .replace(new RegExp('```', 'g'), ' ')
      .replace(new RegExp(`\\s`, 'g'), ' ')

    res.json(JSON.parse(newStr))
    // console.log(JSON.stringify(response.candidates))
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
