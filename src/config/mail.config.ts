import dotenv from 'dotenv'

dotenv.config()
const APP_ENV = process.env['ENVIRONMENT'] ?? 'dev'

const mailConfig = {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
    password: process.env.MAIL_PASSWORD,
    debug: APP_ENV !== 'prod',
    logger: APP_ENV !== 'prod',
}

export default mailConfig
