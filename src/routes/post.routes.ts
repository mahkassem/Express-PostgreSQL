import express from 'express'
import PostController from '../controllers/post.controller'
import { authorized } from '../middleware/auth.guard'
import {
    validateCreateRequest,
    validateUpdateRequest,
} from '../validators/post.validators'

const postRoute = express.Router()
const _controller = PostController

/**
 * * get all posts
 * @method GET
 * @returns {Post[]}
 */
postRoute.get(
    '/', // * path
    _controller.index // ? controller
)

/** 
 * * get single post
 * @method GET
 * @param {number} id
 * @returns {Post}
 */
postRoute.get(
    '/:id', // * path
    _controller.single // ? controller
)

/**
 * * create request
 * @method POST
 * @dataType body json
 * @param post: Partial<Post>
 * @returns Post
 * @throws {Error} 401: Unpostorized
 */
postRoute.post(
    '/', // * path
    authorized, // ! middleware
    validateCreateRequest, // ! validation
    _controller.create // ? controller
)

/**
 * * update request
 * @method PUT
 * @dataType body json
 * @param post: Partial<Post>
 * @returns Post
 * @throws {Error} 401: Unpostorized
 */
postRoute.put(
    '/', // * path
    authorized, // ! middleware
    validateUpdateRequest, // ! validation
    _controller.update // ? controller
)

export default postRoute
