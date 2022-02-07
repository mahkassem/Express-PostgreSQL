import { Request, Response } from 'express'
import AuthService from '../services/auth.service'

const _service = AuthService
export default class AuthController {
  /**
  * * login
  */
  static login = async (req: Request, res: Response) => {
    try {
      const authenticatedUser = await _service.login(req)
      if (authenticatedUser) {
        res.send({
          message: 'User logged in successfully',
          data: authenticatedUser,
        })
      } else {
        res
          .send({
            message: 'Unable to login',
            error: 'Invalid credentials',
          })
          .status(401)
      }
    } catch (error) {
      res.status(500).send({
        message: 'Internal server error',
        error: (error ?? null) as string,
      })
    }
  }

  /**
  * * register
  */
  static register = async (req: Request, res: Response) => {
    try {
      const registeredUser = await _service.register(req)
      if (registeredUser) {
        res.send({
          message: 'User registered successfully',
          data: registeredUser,
        })
      } else {
        throw new Error('Unable to register user')
      }
    } catch (error) {
      res.status(500).send({
        message: 'Internal server error',
        error: (error ?? null) as string,
      })
    }
  }
}
