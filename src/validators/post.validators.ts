import { NextFunction, Request, Response } from 'express'
import { UploadedFile } from 'express-fileupload'
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
    if (await _repo.singleAsync({ title })) {
      errorsBag.push('Title is already taken')
    }

    if (title.length < 10) {
      errorsBag.push('Title must be at least 10 characters long')
    }

    if (title.length > 255) {
      errorsBag.push('Title must be less than 255 characters long')
    }
  }


  if (req.files) {
    if (!req.files.image) {
      errorsBag.push('Image cannot be empty')
    } else {
      const { image } = req.files as unknown as { image?: UploadedFile }
      if (image) {
        if (!image.name) {
          errorsBag.push('Invalid image')
        }

        if (image.size > 5242880) {
          errorsBag.push('Image must be less than 5MB')
        }

        if (!/^[image/(jpg|jpeg|png)]+$/.test(image.mimetype)) {
          errorsBag.push('Invalid image type: ' + image.mimetype + '. Only jpg, jpeg and png are allowed')
        }
      }
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
    const post = await _repo.singleAsync({ title })
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
