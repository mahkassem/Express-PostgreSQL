import express, { Request, Response } from 'express'
import AuthController from '../controllers/auth.controller'
import {
  validateLoginRequest,
  validateRegisterRequest,
} from '../validators/auth.validators'

const authRoute = express.Router()

authRoute.post(
  '/login',
  validateLoginRequest,
  (req: Request, res: Response) => {
    AuthController.login(req, res)
  }
)

authRoute.post(
  '/register',
  validateRegisterRequest,
  (req: Request, res: Response) => {
    AuthController.register(req, res)
  }
)

export default authRoute
