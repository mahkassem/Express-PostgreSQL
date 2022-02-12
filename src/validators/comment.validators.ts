import { NextFunction, Request, Response } from 'express'
import PostRepository from '../repositories/post.repository'
import { unprocessableEntityResponse } from '../utils/response'

const _postRepo = new PostRepository()

// * validate create request
const validateCreateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { post_id, body } = req.body

  const errorsBag = []

  if (!post_id) {
    errorsBag.push('post_id is required')
  } else {
    // check if title is already taken
    if (!await _postRepo.singleAsync(parseInt(post_id))) {
      errorsBag.push('Post does not exist')
    }
  }

  if (!body) {
    errorsBag.push('Body is required')
  } else {
    if (body.length < 3) {
      errorsBag.push('Body must be at least 50 characters long')
    }

    if (body.length > 200) {
      errorsBag.push('Body must be less than 200 characters long')
    }
  }

  return errorsBag.length > 0 ?
    unprocessableEntityResponse(res, errorsBag)
    : next()
}

export { validateCreateRequest }
