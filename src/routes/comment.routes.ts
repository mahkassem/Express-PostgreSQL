import express from 'express'
import CommentController from '../controllers/comment.controller'
import { authorized } from '../middleware/auth.guard'
import {
    validateCreateRequest
} from '../validators/comment.validators'

const commentRoute = express.Router()
const _controller = CommentController

/**
 * * get all post comments
 * @method GET
 * @returns {Comment[]}
 */
commentRoute.get(
    '/:post_id', // * path
    _controller.list // ? controller
)

/**
 * * create request
 * @method POST
 * @dataType body json
 * @param comment: Partial<Comment>
 * @returns Comment
 * @throws {Error} 401: Uncommentorized
 */
commentRoute.post(
    '/', // * path
    authorized, // ! middleware
    validateCreateRequest, // ! validation
    _controller.create // ? controller
)

export default commentRoute
