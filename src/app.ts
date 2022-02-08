import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from './routes'
import appConf from './config/app.config'

const app: Application = express() // create an express application
const port = appConf.port // default port to listen

// Defaul middlewares
app.use(cors(), morgan('dev'), express.json(), helmet())

// Routes
app.use('/api', routes)

// Start the server
app.listen(port, () => {
  console.log(`${appConf.name} Server is running on: http://localhost:${port}`)
})

export default app
