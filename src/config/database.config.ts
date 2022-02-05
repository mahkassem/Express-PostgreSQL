import dotenv from 'dotenv'

dotenv.config()
const ENV = process.env.ENVIRONMENT || 'dev'

const databaseConfig = {
    host: process.env.POSTGRES_HOST ?? 'localhost',
    port: Number(process.env.POSTGRES_PORT) ?? 5432,
    user: process.env.POSTGRES_USER ?? 'postgres',
    password: process.env.POSTGRES_PASSWORD ?? 'postgres',
    database: ENV === 'test' ? process.env.POSTGRES_TEST_DB : process.env.POSTGRES_DB
}

export default databaseConfig