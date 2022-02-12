import DB from '../database'
import { Post } from '../models/post.model'
import Repository from './base.repository'
import dbContext from './db-context'

export default class PostRepository extends Repository<Post> {

  constructor() {
    super('')
    this.table = dbContext.posts
  }

  /**
   * * get post by id with user
  */
  async singleWithUserAsync(id: number): Promise<Post> {
    // post with user
    const post = await DB.query(`
      SELECT
        a.id,
        a.title,
        a.body,
        b.id AS author_id,
        CONCAT_WS(' ',b.first_name,b.last_name) AS author,
        a.created_at
        FROM posts a
        JOIN users b ON b.id = a.user_id
        WHERE a.id = $1
    `, [id]).catch(err => console.log(err))
    return post?.rows[0] ?? null
  }


  /**
   * * get posts with user
  */
  async postsWithUserAsync(): Promise<Post[]> {
    // posts with user
    const posts = await DB.query(`
      SELECT 
        a.id,
        a.title,
        a.body,
        CONCAT_WS(' ',b.first_name,b.last_name) AS author,
        a.created_at 
        FROM posts a
        JOIN users b ON b.id = a.user_id 
        ORDER BY a.created_at DESC
    `).catch(error => console.log(error))

    return posts?.rows ?? []
  }

}
