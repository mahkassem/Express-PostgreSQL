import { NextFunction, Request, Response } from 'express'
import PostRepository from '../repositories/post.repository'
import { unprocessableEntityResponse } from '../utils/response'

const _repo = new PostRepository()

// * validate create request
const validateCreateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, body } = req.body

  const errorsBag = []

  if (!title) {
    errorsBag.push('Title is required')
  } else {
    // check if title is already taken
    if (await _repo.singleAsync({ title: title })) {
      errorsBag.push('Title is already taken')
    }

    if (title.length < 10) {
      errorsBag.push('Title must be at least 10 characters long')
    }

    if (title.length > 255) {
      errorsBag.push('Title must be less than 255 characters long')
    }
  }

  if (!body) {
    errorsBag.push('Body is required')
  } else {
    if (body.length < 50) {
      errorsBag.push('Body must be at least 50 characters long')
    }

    if (body.length > 1000) {
      errorsBag.push('Body must be less than 1000 characters long')
    }
  }

  return errorsBag.length > 0 ?
    unprocessableEntityResponse(res, errorsBag)
    : next()
}

// * validate update request
const validateUpdateRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id, title, body } = req.body
  const errorsBag = []

  if (!title) {
    errorsBag.push('Title is required')
  } else {
    // check if title is already taken
    const post = await _repo.singleAsync({ title: title })
    if (post && post.id !== id && post.title === title) {
      errorsBag.push('Title is already taken')
    }

    if (title.length < 10) {
      errorsBag.push('Title must be at least 10 characters long')
    }

    if (title.length > 255) {
      errorsBag.push('Title must be less than 255 characters long')
    }
  }

  if (!body) {
    errorsBag.push('Body is required')
  } else {
    if (body.length < 50) {
      errorsBag.push('Body must be at least 50 characters long')
    }

    if (body.length > 1000) {
      errorsBag.push('Body must be less than 1000 characters long')
    }
  }

  return errorsBag.length > 0 ?
    unprocessableEntityResponse(res, errorsBag)
    : next()
}

export { validateCreateRequest, validateUpdateRequest }
