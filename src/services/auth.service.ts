import appConf from '../config/app.config'
import { Request } from 'express'
import UserRepository from '../repositories/user.repository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { hidePassword } from '../utils/sanitizer'

const _repo = UserRepository

export default class AuthService {
  // login request
  static login = async (req: Request) => {
    const { username, password } = req.body

    const user = await _repo.findByUsername(username)

    if (!user) {
      return null
    }

    const isMatch = bcrypt.compareSync(
      password + appConf.bcryptPaper,
      user.password as string
    )

    if (!isMatch) {
      return null
    }

    return {
      token: jwt.sign({ sub: username }, appConf.jwtSecret as string, {
        expiresIn: '1m',
      }),
      user: hidePassword(user),
    }
  }

  // register user
  static register = async (req: Request) => {
    const user = req.body

    const hashedPassword = bcrypt.hashSync(
      user.password + appConf.bcryptPaper,
      appConf.bcryptSalt
    )

    user.password = hashedPassword

    const createdUser = await _repo.create(user)

    return hidePassword(createdUser)
  }
}
