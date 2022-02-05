import { Request } from 'express'

const _repo = PostRepository;

export default class PostService {
    static create = (req: Request) => {
        const post = req.body
        const newPost = await _repo.create(post)

        return newPost;
    }

    static update = (req: Request) => {
        // update post logic
    }

    static delete = (id: number) => {
        // delete post method
    }
}