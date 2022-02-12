import { NextFunction, Request, Response } from 'express'
import UserRepository from '../repositories/user.repository'
import { unprocessableEntityResponse } from '../utils/response'

const _repo = new UserRepository()

// validate login request
const validateLoginRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body

  const errorsBag = []

  if (!username) {
    errorsBag.push('Username is required')
  }

  if (!password) {
    errorsBag.push('Password is required')
  }

  return errorsBag.length > 0 ?
    unprocessableEntityResponse(res, errorsBag)
    : next()
}

// validate register request
const validateRegisterRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, first_name, last_name, password } = req.body

  const errorsBag = []

  if (!username) {
    errorsBag.push('Username is required')
  } else {
    // check if username is already taken
    if (await _repo.singleAsync(username)) {
      errorsBag.push('Username is already taken')
    }

    if (username.length < 3) {
      errorsBag.push('Username must be at least 3 characters long')
    }

    if (username.length > 20) {
      errorsBag.push('Username must be less than 20 characters long')
    }
  }

  if (!first_name) {
    errorsBag.push('First name is required')
  } else {
    if (first_name.length < 2) {
      errorsBag.push('First name must be at least 2 characters')
    }

    // no numbers
    if (!/^[a-zA-Z]+$/.test(first_name)) {
      errorsBag.push('First name must contain only letters')
    }
  }

  if (!last_name) {
    errorsBag.push('Last name is required')
  } else {
    if (last_name.length < 2) {
      errorsBag.push('Last name must be at least 2 characters')
    }

    // no numbers
    if (!/^[a-zA-Z]+$/.test(last_name)) {
      errorsBag.push('Last name must contain only letters')
    }
  }

  if (!password) {
    errorsBag.push('Password is required')
  } else {
    if (password.length < 8) {
      errorsBag.push('Password must be at least 8 characters long')
    }

    // strong password regex
    const strongRegex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'
    )

    if (!strongRegex.test(password)) {
      errorsBag.push(
        'Password must contain at least one lowercase letter, one uppercase letter, one number and one special character'
      )
    }
  }

  return errorsBag.length > 0 ?
    unprocessableEntityResponse(res, errorsBag)
    : next()
}

export { validateLoginRequest, validateRegisterRequest }
