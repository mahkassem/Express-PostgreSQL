import { UploadedFile } from 'express-fileupload'
import storageConf from '../config/storage.config'

export default class FileService {

    static uploadSingleAsync = async (file: UploadedFile): Promise<string> => {
        try {
            const timestamp = Date.now()
            const uploadPath = `${storageConf.dir_location}/posts/${timestamp}_${file.name}`
            file.mv(uploadPath, () => {
                console.log(`File uploaded to ${uploadPath}`)
            })
            return `posts/${timestamp}_${file.name}`
        } catch (error) {
            throw new Error(error as string)
        }
    }
}