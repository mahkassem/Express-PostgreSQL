import appConf from '../config/app.config'
import { Request, Response } from 'express'
import UserRepository from '../repositories/user.repository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { hidePassword } from '../utils/sanitizer'
import { AuthObject, User } from '../models/user.model'

const _repo = new UserRepository()

export default class AuthService {
  // login request
  static login = async (req: Request): Promise<AuthObject | null> => {
    // get parameters from request body
    const { username, password } = req.body

    // get user by user name
    const user = await _repo.singleAsync(username)

    // 2. verify user exists
    if (!user) {
      return null
    }

    // 3. comapre passwords
    const isMatch = bcrypt.compareSync(
      password + appConf.bcryptPaper,
      user.password as string
    )

    if (!isMatch) {
      return null
    }

    // 4 + 5: generate and send token to user
    return generateAuthObject(user)
  }

  // register user
  static register = async (req: Request) => {
    const user = req.body

    // generate a password hash
    const hashedPassword = bcrypt.hashSync(
      user.password + appConf.bcryptPaper,
      appConf.bcryptSalt
    )

    // assign hash value to the user object
    user.password = hashedPassword

    const createdUser = await _repo.createAsync(user)

    return generateAuthObject(createdUser)
  }
}

const generateAuthObject = (user: User): AuthObject => {
  const generatedToken =
    jwt.sign(
      { sub: user.username, name: `${user.first_name} ${user.last_name}` },
      appConf.jwtSecret as string,
      { expiresIn: '30d' }
    )
  return {
    token: generatedToken,
    user: hidePassword(user),
  }
}

// get function

export const authUser = (res: Response) => res.locals.user

