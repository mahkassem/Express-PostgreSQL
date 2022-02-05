import DB from '../database'
import { User } from '../models/user.model'

export default class UserRepository {
  /**
   * get all users
   * @returns {Promise<User[]>}
   */
  static async findAll(): Promise<User[]> {
    const result = await DB.query('SELECT * FROM users')
    return result.rows
  }

  /**
   * get user by id
   * @param {number} id
   * @returns {Promise<User>}
   */
  static async findById(id: number): Promise<User> {
    const result = await DB.query('SELECT * FROM users WHERE id = $1', [id])
    return result.rows[0]
  }

  /**
   * get user by id
   * @param {string} username
   * @returns {Promise<User>}
   */
  static async findByUsername(username: string): Promise<User> {
    const result = await DB.query('SELECT * FROM users WHERE username = $1', [
      username,
    ])
    return result.rows[0]
  }

  /**
   * create new user
   * @param {User} user
   * @returns {Promise<User>}
   */
  static async create(user: User): Promise<User> {
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
  static async update(user: User): Promise<User> {
    const { id, username, first_name, last_name, password } = user
    const result = await DB.query(
      'UPDATE users SET username = $1, first_name = $2, last_name = $3, password = $4 WHERE id = $5 RETURNING *',
      [username, first_name, last_name, password, id]
    )
    return result.rows[0]
  }

  /**
   * delete user
   * @param {number} id
   * @returns {Promise<User>}
   */
  static async delete(id: number): Promise<number> {
    const result = await DB.query('DELETE FROM users WHERE id = $1', [id])
    return result.rowCount
  }
}
