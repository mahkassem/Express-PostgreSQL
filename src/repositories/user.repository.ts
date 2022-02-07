import DB from '../database'
import { User } from '../models/user.model'
import Repository from './base.repository'
import dbContext from './db-context'

export default class UserRepository extends Repository<User> {
  
  constructor() {
    super('')
    this.table = dbContext.users
  }
  /**
   * create new user
   * @param {User} user
   * @returns {Promise<User>}
   */
  async createAsync(user: User): Promise<User> {
    const { username, first_name, last_name, password } = user
    const result = await DB.query(
      'INSERT INTO users (username, first_name, last_name, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [username, first_name, last_name, password]
    )
    return result.rows[0]
  }

  /**
   * update user
   * @param {User} user
   * @returns {Promise<User>}
   */
  async updateAsync(user: User): Promise<User> {
    const { id, username, first_name, last_name, password } = user
    const result = await DB.query(
      'UPDATE users SET username = $1, first_name = $2, last_name = $3, password = $4 WHERE id = $5 RETURNING *',
      [username, first_name, last_name, password, id]
    )
    return result.rows[0]
  }
}
