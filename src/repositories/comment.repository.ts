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
        a.id,
        a.body,
        CONCAT_WS(' ',b.first_name,b.last_name) AS author,
        a.created_at 
        FROM comments a
        JOIN users b ON b.id = a.user_id 
        WHERE a.post_id = $1
        ORDER BY a.created_at DESC
    `, [post_id]).catch(err => console.log(err))
    return comments?.rows ?? []
  }

}
