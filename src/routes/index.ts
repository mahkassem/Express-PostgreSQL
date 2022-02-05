import express from 'express'
import { authorized } from '../middleware/auth.guard'
import auth from './auth.routes'

const appRouter = express.Router()

appRouter.use('/auth', auth)

appRouter.get('/secure', authorized, (req: express.Request, res: express.Response) => {
    res.send('Hello from secure route')
})

export default appRouter
