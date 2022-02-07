import DB from '../database'

export interface IRepository<T> {
    listAsync(): Promise<T[]>
    singleAsync(id: number, column: string): Promise<T>
    deleteAsync(id: number): Promise<boolean>
}
type BaseRepository<T> = IRepository<T>

export abstract class Repository<T> implements BaseRepository<T> {

    constructor(
        public table: string
    ) { }

    /**
   * get all models
   * @returns {Promise<T[]>}
   */
    async listAsync(): Promise<T[]> {
        const result = await DB.query(`SELECT * FROM ${this.table}`)
        return result.rows
    }

    /**
     * get model by id
     * @param {number} id || @param {string} username
     * @returns {Promise<T>}
     */
    async singleAsync(value: number | string): Promise<T> {
        const column = typeof value == 'number' ? 'id' : 'username' // detect query attribute
        const result = await DB.query(`SELECT * FROM ${this.table} WHERE ${column} = $1`, [value])
        return result.rows[0]
    }

    /**
     * delete model
     * @param {number} id
     * @returns {Promise<T>}
     */
    async deleteAsync(id: number): Promise<boolean> {
        const result = await DB.query(`DELETE FROM ${this.table} WHERE id = $1`, [id])
        return result.rowCount > 0
    }
}