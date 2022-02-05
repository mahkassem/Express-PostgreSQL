import DB from '../database'
import { Post } from '../models/post.model'

export default class PostRepository {
    static getAll = async (post: Post): Promise<Post[]> {
        // get all posts sql commnad
    }

    static getById(id: number): Promise<Post> {
        // get post by id sql command
    }

    static getByUserId(user_id: number): Promise<Post[]> {
        // get posts where user_id = $1 sql command
    }
}