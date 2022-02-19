import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const appConfig = {
  name: process.env.APP_NAME,
  environment: process.env.ENVIRONMENT,
  url: process.env.APP_URL,
  port: Number(process.env.PORT) || 3000,
  storage: path.join(__dirname, '../../', (process.env.STORAGE_PATH || 'storage')),
  storage_dir: process.env.STORAGE_PATH,
  jwtSecret: process.env.JWT_SECRET,
  bcryptSalt: Number(process.env.BCRYPT_ROUNDS) || 10,
  bcryptPaper: process.env.BCRYPT_PASSWORD_PAPER,
}

export default appConfig
