import { Request, Response } from 'express'
import { authenticate, registerUser } from '../services/auth.service'
/**
 * login request
 * @param username: string
 * @param password: string
 * @returns {Promise<AuthObject>}
 */
export default class AuthController {
  static login = async (req: Request, res: Response) => {
    try {
      const authenticatedUser = await authenticate(req)
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

  static register = async (req: Request, res: Response) => {
    try {
      const registeredUser = await registerUser(req)
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
