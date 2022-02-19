import dotenv from 'dotenv'
import path from 'path'

dotenv.config()

const storageConfig = {
    dir_location: path.join(__dirname, '../../', (process.env.STORAGE_PATH || 'storage')),
    dir_name: process.env.STORAGE_PATH,
}

export default storageConfig
