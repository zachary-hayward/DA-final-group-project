import express from 'express'
import * as Path from 'node:path'
import googleGemini from './routes/googleGemini.ts'

// import fruitRoutes from './routes/fruits.ts'
import routes from './routes/growGrub.ts'

const server = express()

server.use(express.json())

// server.use('/api/v1/fruits', fruitRoutes)
// server.use('/api/v1', routes)
server.use('/api/v1/googleGemini', googleGemini)

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(Path.resolve('public')))
  server.use('/assets', express.static(Path.resolve('./dist/assets')))
  server.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server
