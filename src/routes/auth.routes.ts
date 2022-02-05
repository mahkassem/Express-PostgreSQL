import express, { Request, Response } from 'express'
import AuthController from '../controllers/auth.controller'
import {
  validateLoginRequest,
  validateRegisterRequest,
} from '../validators/auth.validators'

const authRoute = express.Router()

/**
 * * login request
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
    AuthController.login(req, res)
  }
)

/**
 * * register request
 * @param user: User
 * @returns User
 * @throws {Error} 422: Unprocessable entity
 */
authRoute.post(
  '/register',
  validateRegisterRequest,
  (req: Request, res: Response) => {
    AuthController.register(req, res)
  }
)

export default authRoute
