import { Request, Response } from 'express'
import CommentService from '../services/comment.service'
import {
  internalServerErrorResponse,
  resourceCreatedResponse,
  successResponse
} from '../utils/response'

const _service = CommentService
export default class CommentController {

  /**
  * * list
  */
  static list = async (req: Request, res: Response) => {
    try {
      const comments = await _service.postComments(req)
      return successResponse(res, comments)
    } catch (error) {
      return internalServerErrorResponse(res, error)
    }
  }

  /**
  * * create
  */
  static create = async (req: Request, res: Response) => {
    try {
      const createdComment = await _service.create(req, res)
      if (createdComment) {
        return resourceCreatedResponse(res, createdComment)
      } else {
        throw new Error('Unable to create comment')
      }
    } catch (error) {
      return internalServerErrorResponse(res, error)
    }
  }

}
