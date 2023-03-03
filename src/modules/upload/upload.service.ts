import { BadRequestException, Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { FileUpload } from '../../common/interfaces/common.interface';

@Injectable()
export class UploadService {
  constructor() {
    cloudinary.v2.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
  }

  async uploadFile(image: Promise<FileUpload>, folder: string)
    : Promise<{ url: string }> {
    const { filename, createReadStream } = await image;

    return await new Promise(async (resolve) => {
      const upload_stream = cloudinary.v2.uploader.upload_stream({
        folder
      }, (err, result) => {
        if (result) {
          resolve({
            url: result.url
          })
        } else {
          throw new BadRequestException(err.message)
        }
      })
      createReadStream()
        .pipe(upload_stream)
    })
  }
  

}
