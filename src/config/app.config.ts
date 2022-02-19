import dotenv from 'dotenv'

dotenv.config()

const appConfig = {
  name: process.env.APP_NAME,
  environment: process.env.ENVIRONMENT,
  url: process.env.APP_URL,
  port: Number(process.env.PORT) || 3000,
  jwtSecret: process.env.JWT_SECRET,
  bcryptSalt: Number(process.env.BCRYPT_ROUNDS) || 10,
  bcryptPaper: process.env.BCRYPT_PASSWORD_PAPER,
}

export default appConfig
