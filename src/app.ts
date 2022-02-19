import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import routes from './routes'
import appConf from './config/app.config'
import fileUpload from 'express-fileupload'

const app: Application = express() // create an express application
const port = appConf.port || 3000 // default port to listen
const url = appConf.url // default url to listen

console.log(appConf.storage)

// enable files upload
app.use(fileUpload({
  createParentPath: true, // create the parent path (default: false)
  tempFileDir: '/tmp/', // temporary file directory
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB
  }
}))

// Defaul middlewares
app.use(
  cors(), // enable cors
  morgan('dev'), // log requests to the console
  express.json(), // parse application/json
  express.urlencoded({
    extended: true
  }), // parse application/x-www-form-urlencoded
  helmet() // secure express headers
)

// Routes
app.use('/api', routes)

// Start the server
app.listen(port, () => {
  console.log(`${appConf.name} Server is running on: ${url}`)
})

export default app
