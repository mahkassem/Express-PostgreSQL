import { Request, Response } from 'express'
import PostRepository from '../repositories/post.repository'
import { Post } from '../models/post.model'
import FileService from '../services/file.service'
import { UploadedFile } from 'express-fileupload'
import { IPaginatedResult } from '../repositories/base.repository'
import { validatedPagination } from '../validators/common.validators'

const _repo = new PostRepository()
const _fileService = FileService
export default class PostService {

    /**
     * Get all posts
     * @returns {Promise<Post[]>}
     */
    static index = async (req: Request): Promise<Post[] | IPaginatedResult<Post>> => {
        const paginate = validatedPagination(req) // get pagination params
        const posts = await _repo.listAsync({ paginate, orderBy: { created_at: 'desc' } })
        return posts
    }

    static single = async (req: Request): Promise<Post | null> => {
        const { id } = req.params
        const post = await _repo.singleWithUserAsync(parseInt(id)) // get post
        if (!post) {
            return null
        }
        return post
    }

    static create = async (req: Request, res: Response): Promise<Post | null> => {
        const post = req.body
        const user = res.locals.user // get authenticated user
        const { image } = req.files as unknown as { image: UploadedFile }
        post.user_id = user.id
        const savedFile = await _fileService.uploadSingleAsync(image) // upload file
        post.image_url = savedFile
        const createdPost = await _repo.createAsync(post) // create post
        return createdPost
    }

    static update = async (req: Request): Promise<Post | null> => {
        const post = req.body
        const updatedPost = await _repo.updateAsync(post) // update post
        return updatedPost
    }
}