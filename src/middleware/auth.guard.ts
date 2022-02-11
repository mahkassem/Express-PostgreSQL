import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import UserRepository from '../repositories/user.repository'
import { User } from '../models/user.model'
import appConf from '../config/app.config'

const jwtSecret = appConf.jwtSecret
const _repo = new UserRepository()

export const authorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const authorizationHeader = req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1] // [0: 'Bearer', 1:'<token>']

    // Check if token is valid
    const isValidJwt = jwt.verify(token, jwtSecret as string)

    if (!isValidJwt) {
      throw new Error()
    }

    // Decode token
    const payload = jwt.decode(token)

    // Check if user exists
    const user: User = await _repo.singleAsync(payload?.sub as string)
    if (!user) throw new Error()

    // Continue to request
    next()
  } catch (error) {
    res.status(401).json({
      message: error ? error : 'Unauthorized',
    })
  }
}
