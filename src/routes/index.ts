import express from 'express'
import { authorized } from '../middleware/auth.guard'
import auth from './auth.routes'
import post from './post.routes'
import comment from './comment.routes'

const appRouter = express.Router()

/**
 * * auth routes
 */
appRouter.use('/auth', auth)
appRouter.use('/posts', post)
appRouter.use('/comments', comment)

/**
 * * authorized request
 * ! This route is protected by auth.guard
 * @header Authorization: Bearer <token>
 * @returns string
 * ? Use this route to test a token
 */
appRouter.get(
  '/secure',
  authorized,
  (req: express.Request, res: express.Response) => {
    res.send('Hello from secure route')
  }
)

export default appRouter
