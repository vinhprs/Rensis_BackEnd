import { cloudinary_config } from "../configs/cloudinary.config";
import { FileUpload } from "../common/entities/common.entity";
import { rejects } from "assert";

export async function uploadFile(image: Promise<FileUpload>, folder: string)
    : Promise<{url: string}> {
    const { filename, createReadStream } = await image;
    
    return await new Promise(async (resolve, reject) => {
        const upload_stream = cloudinary_config.uploader.upload_stream({
            folder
        }, (err, result) => {
            if(result) {
                resolve({
                    url:  result.url
                })
            } else {
                reject(err.message)
            }
        })
        createReadStream()
        .pipe(upload_stream)
    })
}