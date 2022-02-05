import appConf from '../config/app.config'
import { Request } from 'express'
import UserRepository from '../repositories/user.repository'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { hidePassword } from '../utils/sanitizer'

const store = UserRepository

// login request
const authenticate = async (req: Request) => {
    const { username, password } = req.body

    const user = await store.findByUsername(username)

    if (!user) {
        return null
    }

    const isMatch = bcrypt.compareSync(password + appConf.bcryptPaper, (user.password as string))

    if (!isMatch) {
        return null
    }

    return {
        token: jwt.sign({ sub: username }, appConf.jwtSecret as string, { expiresIn: '1m' }),
        user: hidePassword(user)
    }
}

// register user
const registerUser = async (req: Request) => {
    const user = req.body

    const hashedPassword = bcrypt.hashSync(user.password + appConf.bcryptPaper, 10)

    user.password = hashedPassword

    const createdUser = await store.create(user)

    return hidePassword(createdUser)
}
export { authenticate, registerUser }