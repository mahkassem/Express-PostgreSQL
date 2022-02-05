import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from './routes'

const app: Application = express() // create an express application
const port = 3000 // default port to listen

// Defaul middlewares
app.use(cors(), morgan('dev'), express.json(), helmet())

// Routes
app.use('/api', routes)

// Start the server
app.listen(port, () => {
  console.log(`Server is running on: http://localhost:${port}`)
})

export default app
