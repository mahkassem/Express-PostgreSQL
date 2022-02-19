import { Request } from 'express'

export const validatedPagination = (req: Request): { page: number, perPage: number } | undefined => {
    const { page, perPage } = req.query
    let paginate = undefined
    if (((page && Number(page) > 0) && (perPage && Number(perPage) > 0))) {
        paginate = { page: Number(page), perPage: Number(perPage) }
    }
    return paginate
}