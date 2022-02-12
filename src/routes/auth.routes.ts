import express from 'express'
import AuthController from '../controllers/auth.controller'
import {
  validateLoginRequest,
  validateRegisterRequest,
} from '../validators/auth.validators'

const authRoute = express.Router()
const _controller = AuthController

/**
 * * login request
 * @method POST
 * @dataType body json
 * @param username: string
 * @param password: string
 * @returns AuthObject
 * @throws {Error} 401: Unauthorized
 * @throws {Error} 422: UnprocessableEntity
 */
authRoute.post(
  '/login', // * path
  validateLoginRequest, // ! validation
  _controller.login // ? controller
)

/**
 * * register request
 * @method POST
 * @param user: User
 * @returns User
 * @throws {Error} 422: Unprocessable entity
 */
authRoute.post(
  '/register', // * path
  validateRegisterRequest, // ! validation
  _controller.register // ? controller
)

export default authRoute
