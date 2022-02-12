import { Request, Response } from 'express'
import CommentRepository from '../repositories/comment.repository'
import { Comment } from '../models/post.model'

const _repo = new CommentRepository()

export default class CommentService {

    static postComments = async (req: Request): Promise<Comment[]> => {
        const { post_id } = req.params
        const comments = await _repo.postCommentsAsync(parseInt(post_id))
        return comments
    }

    static create = async (req: Request, res: Response): Promise<Comment | null> => {
        const comment = req.body
        const user = res.locals.user
        comment.user_id = user.id
        const createdComment = await _repo.createAsync(comment)
        return createdComment
    }
}