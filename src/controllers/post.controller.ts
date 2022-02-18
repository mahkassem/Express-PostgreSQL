import { Request, Response } from 'express'
import PostService from '../services/post.service'
import CommentService from '../services/comment.service'
import {
  internalServerErrorResponse,
  notFoundResponse,
  resourceCreatedResponse,
  resourceUpdatedResponse,
  successResponse
} from '../utils/response'
import { MailService } from '../services/mail.service'

const _service = PostService
const _mailService = MailService
const _commentService = CommentService
export default class PostController {

  /**
  * * index
  */
  static index = async (req: Request, res: Response) => {
    try {
      const posts = await _service.index()
      return successResponse(res, posts)
    } catch (error) {
      return internalServerErrorResponse(res, error)
    }
  }

  /**
   * * single
   */
  static single = async (req: Request, res: Response) => {
    try {
      // get post
      const post = await _service.single(req)
      if (!post) return notFoundResponse(res)
      // then get comments
      req.params.post_id = req.params.id
      const postComments = await _commentService.postComments(req)
      post.comments = postComments
      return successResponse(res, post)
    } catch (error) {
      return internalServerErrorResponse(res, error)
    }
  }
  /**
  * * create
  */
  static create = async (req: Request, res: Response): Promise<void> => {
    try {
      const createdPost = await _service.create(req, res)
      if (createdPost) {
        // send email
        await _mailService.newPostAlert(createdPost)
        return resourceCreatedResponse(res, createdPost)
      } else {
        throw new Error('Unable to create resource')
      }
    } catch (error) {
      return internalServerErrorResponse(res, error)
    }
  }

  /**
  * * update //
  */
  static update = async (req: Request, res: Response) => {
    try {
      const updatedPost = await _service.update(req)
      if (updatedPost) {
        return resourceUpdatedResponse(res, updatedPost)
      } else {
        throw new Error('Unable to update resource')
      }
    } catch (error) {
      return internalServerErrorResponse(res, error)
    }
  }
}
