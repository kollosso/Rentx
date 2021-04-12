import { resolve } from 'path'
import crypto from 'crypto'
import multer from 'multer'


const tmpFolder = resolve(__dirname, '..', '..', 'tmp')

export default {
  tmpFolder,
  storage: multer.diskStorage({
    destination: tmpFolder,
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString('hex')
      const fileName = `${Date.now()}-${fileHash}-${file.originalname}`

      return callback(null, fileName)
    }
  })
}
