import express, { Request, Response } from 'express'
import AuthController from '../controllers/auth.controller'
import {
  validateLoginRequest,
  validateRegisterRequest,
} from '../validators/auth.validators'

const authRoute = express.Router()
const _controller = AuthController

/**
 * * login request
 * @method Post
 * @dataType body json
 * @param username: string
 * @param password: string
 * @returns AuthObject
 * @throws {Error} 401: Unauthorized
 * @throws {Error} 422: UnprocessableEntity
 */
authRoute.post(
  '/login',
  validateLoginRequest,
  (req: Request, res: Response) => {
    _controller.login(req, res)
  }
)

/**
 * * register request
 * @method Post
 * @param user: User
 * @returns User
 * @throws {Error} 422: Unprocessable entity
 */
authRoute.post(
  '/register',
  validateRegisterRequest,
  (req: Request, res: Response) => {
    _controller.register(req, res)
  }
)

export default authRoute
