import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import UserRepository from '../repositories/user.repository'
import { User } from '../models/user.model'

dotenv.config()
const jwtSecret = process.env.JWT_SECRET

const store = UserRepository

export const authorized = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get token from header
    const authorizationHeader = req.headers.authorization as string
    const token = authorizationHeader.split(' ')[1]

    // Check if token is valid
    const isValidJwt = jwt.verify(token, jwtSecret as string)

    if (!isValidJwt) {
      throw new Error()
    }

    // Decode token
    const payload = jwt.decode(token)

    // Check if user exists
    const user: User = await store.findByUsername(payload?.sub as string)
    if (!user) throw new Error()

    // Continue to request
    next()
  } catch (error) {
    res.status(401).json({
      message: error ? error : 'Unauthorized',
    })
  }
}
