import { Request, Response } from 'express'
import PostRepository from '../repositories/post.repository'
import { Post } from '../models/post.model'

const _repo = new PostRepository()

export default class PostService {

    /**
     * Get all posts
     * @returns {Promise<Post[]>}
     */
    static index = async (): Promise<Post[]> => {
        const posts = await _repo.postsWithUserAsync()
        return posts
    }

    static single = async (req: Request): Promise<Post | null> => {
        const { id } = req.params
        const post = await _repo.singleWithUserAsync(parseInt(id))
        if (!post) {
            return null
        }
        return post
    }

    static create = async (req: Request, res: Response): Promise<Post | null> => {
        const post = req.body
        const user = res.locals.user
        post.user_id = user.id
        const createdPost = await _repo.createAsync(post)
        return createdPost
    }

    static update = async (req: Request): Promise<Post | null> => {
        const post = req.body
        const updatedPost = await _repo.updateAsync(post)
        return updatedPost
    }
}