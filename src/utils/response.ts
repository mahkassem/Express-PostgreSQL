import { Response } from 'express'

export const successResponse = (res: Response, data: unknown, message?: string) => {
    res.status(200).send({
        message: message ?? 'Success',
        data,
    })
}

export const resourceCreatedResponse = (res: Response, data: unknown, message?: string) => {
    res.status(201).send({
        message: message ?? 'Resource created successfully',
        data,
    })
}

export const resourceUpdatedResponse = (res: Response, data: unknown, message?: string) => {
    res.status(200).send({
        message: message ?? 'Resource updated successfully',
        data,
    })
}

export const internalServerErrorResponse = (res: Response, error: unknown, message?: string) => {
    res.status(500).send({
        message: message ?? 'Internal server error',
        error: (error ?? null) as string,
    })
}

export const notFoundResponse = (res: Response, message?: string) => {
    res.status(404).send({
        message: message ?? 'Not found',
    })
}

export const unauthorizedResponse = (res: Response, message?: string) => {
    res.status(401).send({
        message: message ?? 'Unauthorized',
    })
}

export const unauthorizedCredentialsResponse = (res: Response, message?: string) => {
    res.status(401).send({
        message: message ?? 'Unable to login',
        error: 'Invalid credentials',
    })
}

export const badRequestResponse = (res: Response, error: unknown, message?: string) => {
    res.status(400).send({
        message: message ?? 'Bad request',
        error: (error ?? null) as string,
    })
}

export const forbiddenResponse = (res: Response, message?: string) => {
    res.status(403).send({
        message: message ?? 'Access Forbidden',
    })
}

export const notImplementedResponse = (res: Response, message?: string) => {
    res.status(501).send({
        message: message ?? 'Method Not implemented',
    })
}

export const unprocessableEntityResponse = (res: Response, errors: unknown, message?: string) => {
    res.status(422).send({
        message: message ?? 'Unprocessable entity',
        errors
    })
}