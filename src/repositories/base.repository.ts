import DB from '../database'

interface IRepository<T> {
    listAsync(): Promise<T[]>
    singleAsync(id: number, column: string): Promise<T>
    deleteAsync(id: number): Promise<boolean>
}

type BaseRepository<T> = IRepository<T>

export default abstract class Repository<T> implements BaseRepository<T> {

    constructor(
        public table: string
    ) { }

    /**
   * get all models
   * @returns {Promise<T[]>}
   */
    async listAsync(filter?: object): Promise<T[]> {
        const filterQuery = filter ? `WHERE ${Object.keys(filter)[0]} = '${Object.values(filter)[0]}'` : ''
        const result = await DB.query(`SELECT * FROM ${this.table} ${filterQuery}`)
        return result.rows
    }

    /**
     * get model by id
     * @param {number} id || @param {string} username || @param {object} object
     * @returns {Promise<T>} // Model
     */
    async singleAsync(value: number | string | object): Promise<T> {
        const column =
            typeof value == 'number'
                ? 'id'
                : (typeof value == 'string'
                    ? 'username'
                    : Object.keys(value)[0])
        value = typeof value == 'object' ? Object.values(value)[0] : value
        const result = await DB.query(`SELECT * FROM ${this.table} WHERE ${column} = $1`, [value])
        return result.rows[0]
    }

    /**
     * create model
     * @param {Partial<T>} model
     * @returns {Promise<T>}
     */
    async createAsync(model: Partial<T>): Promise<T> {
        const queryText = `INSERT INTO ${this.table} 
        (${Object.keys(model).join(', ')}) 
        VALUES 
        (${Object.keys(model).map((value, index) => `$${index + 1}`).join(', ')})
        RETURNING *`

        const result = await DB.query(queryText, Object.values(model))
        return result.rows[0]
    }

    /**
     * update model
     * @param {number} id
     * @param {Partial<T>} model
     * @returns {Promise<T>}
     */
    async updateAsync(model: Partial<T>): Promise<T> {
        const columns = Object.keys(model).filter(key => key != 'id')
        const values = Object.values(model)
        const queryText = `UPDATE ${this.table} 
                            SET ${columns.map((column, index) => `${column} = $${index + 2}`).join(', ')}
                            WHERE id = $1 RETURNING *`

        const result = await DB.query(queryText, values)
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