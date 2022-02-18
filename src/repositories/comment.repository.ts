import DB from '../database'
import { Comment } from '../models/post.model'
import Repository from './base.repository'
import dbContext from './db-context'

export default class CommentRepository extends Repository<Comment> {

  constructor() {
    super('')
    this.table = dbContext.comments
  }

  /**
   * * get comments by post id with user
   */
  async postCommentsAsync(post_id: number): Promise<Comment[]> {
    // comments with user
    const comments = await DB.query(`
      SELECT 
      c.id, c.body, c.created_at,
      u.id, CONCAT_WS(' ', u.first_name, u.last_name) AS author 
      FROM comments c 
      JOIN users u ON c.user_id = u.id 
      WHERE c.post_id = $1
      ORDER BY c.created_at DESC
    `, [post_id]).catch(err => console.log(err))
    return comments?.rows ?? []
  }

}
