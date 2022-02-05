import dbConf from './config/database.config'
import { Pool } from 'pg'

const db = new Pool({
    host: dbConf.host,
    port: dbConf.port,
    user: dbConf.user,
    password: dbConf.password,
    database: dbConf.database
})

export default db