import { BadRequestException, Injectable } from '@nestjs/common';
import * as sg from '@sendgrid/mail';
import { SendEmailResponse } from './entites/email.entity';

@Injectable()
export class EmailService {
  constructor() {
    sg.setApiKey(process.env.SENDGRID_API_KEY)
  }
  async sendVerifyEmail(
    to: string,
    randomCode: string
  ): Promise<SendEmailResponse> {
    sg.send({
        from: process.env.SENDGRID_EMAIL,
        to,
        dynamicTemplateData: {
          "OTP": randomCode
        },
        templateId: "d-a06ea697467b44e9bbe1441dafe88191"
      })
      .catch((error) => {
        throw new BadRequestException(error.message)
      })
    return {
      Message: "An email is sent to you!",
      Status: "Success"
    };
  }

  async sendResetPasswordEmail(
    to: string,
    randomCode: string
  ): Promise<SendEmailResponse> {
    sg.send({
        from: process.env.SENDGRID_EMAIL,
        to,
        dynamicTemplateData: {
          "OTP": randomCode
        },
        templateId: "d-51d0aae25b904c8c8a9bf0ec4ac1d6c1"
      })
      .catch((error) => {
        throw new BadRequestException(error.message)
      })
    return {
      Message: "An email is sent to you!",
      Status: "Success"
    };;
  }
}
