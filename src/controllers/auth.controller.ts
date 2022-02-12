import { Request, Response } from 'express'
import AuthService from '../services/auth.service'
import {
  internalServerErrorResponse,
  resourceCreatedResponse,
  successResponse,
  unauthorizedCredentialsResponse
} from '../utils/response'

const _service = AuthService
export default class AuthController {
  /**
  * * login
  */
  static login = async (req: Request, res: Response) => {
    try {
      const authenticatedUser = await _service.login(req)
      if (authenticatedUser) {
        return successResponse(res, authenticatedUser, 'Login successful')
      } else {
        return unauthorizedCredentialsResponse(res)
      }
    } catch (error) {
      return internalServerErrorResponse(res, error)
    }
  }

  /**
  * * register
  */
  static register = async (req: Request, res: Response) => {
    try {
      const registeredUser = await _service.register(req)
      if (registeredUser) {
        return resourceCreatedResponse(res, registeredUser)
      } else {
        throw new Error('Unable to register user')
      }
    } catch (error) {
      return internalServerErrorResponse(res, error)
    }
  }
}
