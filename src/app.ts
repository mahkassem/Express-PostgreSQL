import express, { Application } from 'express'
import cors from 'cors'

const app: Application = express() // create an express application
const port = 3000 // default port to listen

// Defaul middlewares
app.use(cors())

// Routes
app.get('/', (req, res) => {
    res.send('Express server')
})

// parse application/json
app.use(express.json())

// Start the server
app.listen(port, () => {
    console.log(`Server is running on: http://localhost:${port}`)
})

export default app