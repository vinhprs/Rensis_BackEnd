import { Injectable } from '@nestjs/common';
import * as cloudinary from 'cloudinary';
import { FileUpload } from '../common/interfaces/common.interface';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as sg from '@sendgrid/mail';

@Injectable()
export class UtilsService {
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

    return await new Promise(async (resolve, reject) => {
      const upload_stream = cloudinary.v2.uploader.upload_stream({
        folder
      }, (err, result) => {
        if (result) {
          resolve({
            url: result.url
          })
        } else {
          reject(err.message)
        }
      })
      createReadStream()
        .pipe(upload_stream)
    })
  }

  randomOtp(length: number): string {
    let result = '';
    const characters = '0123456789';
    var charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async sendVerifyEmail(
    to: string,
    randomCode: string
  ): Promise<boolean> {
    sg.setApiKey(process.env.SENDGRID_API_KEY)
    try {
      sg
        .send({
          from: process.env.SENDGRID_EMAIL,
          to,
          dynamicTemplateData: {
            "OTP": randomCode
          },
          templateId: "d-a06ea697467b44e9bbe1441dafe88191"
        })
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error.message)
        })
      return true;
    } catch (error) {
      throw new HttpException(error.messages, HttpStatus.BAD_REQUEST)
    }
  }

  async sendResetPasswordEmail(
    to: string,
    randomCode: string
  ): Promise<boolean> {
    sg.setApiKey(process.env.SENDGRID_API_KEY)
    try {
      sg
        .send({
          from: process.env.SENDGRID_EMAIL,
          to,
          dynamicTemplateData: {
            "OTP": randomCode
          },
          templateId: "d-51d0aae25b904c8c8a9bf0ec4ac1d6c1"
        })
        .then(() => {
          console.log('Email sent')
        })
        .catch((error) => {
          console.error(error)
        })
      return true;
    } catch (error) {
      throw new HttpException(error.messages, HttpStatus.BAD_REQUEST)
    }
  }
}
