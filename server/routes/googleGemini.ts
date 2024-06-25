import express from 'express'
import 'dotenv/config'
import { GoogleGenerativeAI } from '@google/generative-ai'
import checkJwt, { JwtRequest } from '../auth0'
import { addPlant, addVege } from '../db/growGrub'

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
    const vege1 = req.query.vege
    console.log(vege1)
    const prompt = `give me json data with whitespacing between each word about plant care information about ${vege1} that contains plant care information. 
    The following properties should be all lowercase, with no spaces in between words.
    difficulty should be one of "easy", "medium" or "hard". 
    watering should be one of three properties: low, moderate or high. 
    sunlight should be "full-shade", "part-sun" or "full-sun" with no spaces in between.
    cycle should be one of "annual", "biennieal", "perennial" or "short-lived-perennial". plantingTime should be the season and month with the seed planting months in New Zealand, plantingSeason should be: "year-round", "summer", "winter", "autumn", "spring" or "early-spring", "late-spring" etc with no spaces in between. 
    planting_starts should be one of: "year-round", "summer", "winter", "autumn",
"spring" or "early-spring", "late-spring" etc with no spaces in between.
    planting_ends should be the last possible month when a seed could be planted.
    Every other property should have spaces in between the words, but keep the strings short please.
    spacing is in metres.
     The json data should bein the form of {
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
        "diseases": str,
        "difficulty": str,
        "planting_starts": str,
        "planting_ends": str,
        "days_from_planting_until_harvest": number,
        "days_from_seed_until_seedling": number,
        "cycle": str,

    },
    "plantingTime": {
        "indoorsPlantingTime": "Start seeds indoors 6-8 weeks before the last frost date in your area.",
        "outdoorsPlantingTime": "Transplant seedlings outdoors after all danger of frost has passed and soil temperatures are consistently above 55°F (13°C).",,
        "spacing": str,
        "plantingTime": str,
        "plantingSeason": str,
        "plantingSeasonEnd": str
    },
    "harvesting": {
        "havestingTime": str,
        "harvestingTips": str
    },
  }
  ]
} `

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

    // add db function to add what we get from Gemini to db
    await addVege(JSON.parse(newStr))
    await addPlant(JSON.parse(newStr))
    // console.log(newStr)
    // res.json(JSON.parse(newStr))
    res.send(newStr)
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message)
      res.status(500).send((err as Error).message)
    } else {
      res.status(500).send('Something went wrong')
    }
  }
})

// router.post('/', checkJwt, async (req: JwtRequest, res) => {
//   console.log(111)
//   const authoId = req.auth?.sub
//   if (geminiApiKey === undefined) {
//     throw new Error('Missing google gemini key environment variable')
//   }
//   if (!authoId) {
//     console.log('No authoId')
//     return res.status(401).send('Unauthorized')
//   }

//   try {
//     const { vege } = req.body
//     console.log(req.body)
//     const prompt = `give me json data with whitespacing between each word about plant care information about ${vege} that contains plant care information, watering with one of three properties: low, medium or high, time should be the season with the seed planting months in New Zealand, spacing in metres, in the form of {
// "plantCareData": [
//   {
//     "plantName": str,
//     "scientificName": str,
//     "description": " ",
//     "careInstructions": {
//         "soil": str,
//         "sunlight": str
//         "watering": str,
//         "fertilization": str,
//         "pruning": str,
//         "pests": str,
//         "diseases": str
//     },
//     "plantingTime": {
//         "indoors": "Start seeds indoors 6-8 weeks before the last frost date in your area.",
//         "outdoors": "Transplant seedlings outdoors after all danger of frost has passed and soil temperatures are consistently above 55°F (13°C).",,
//         "spacing": str,
//         "time": [str],
//     },
//     "harvesting": {
//         "time": str,
//         "tips": str
//     }
// }
//   ]
// } and for each property, keep the strings short please and with spacing between words`
//     const genAI = new GoogleGenerativeAI(geminiApiKey)
//     const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
//     const result = await model.generateContent(prompt)
//     const response = await result.response
//     // console.log(JSON.stringify(response.candidates[0].content.parts[0].text))

//     const reg = new RegExp(`\\n`, `g`)
//     const text1 = response.candidates[0].content.parts[0].text
//     console.log(text1)

//     // const newStr = text1
//     //   .replace(reg, '')
//     //   .replace(new RegExp('```json', 'g'), ' ')
//     //   .replace(new RegExp('```', 'g'), ' ')
//     //   .replace(new RegExp(`\\s`, 'g'), ' ')

//     // res.json(JSON.parse(newStr))
//     // console.log(JSON.stringify(response.candidates))
//   } catch (err) {
//     if (err instanceof Error) {
//       console.log(err.message)
//       res.status(500).send((err as Error).message)
//     } else {
//       res.status(500).send('Something went wrong')
//     }
//   }
// })

export default router
