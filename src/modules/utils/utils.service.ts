import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class UtilsService {
  randomOtp(length: number): string {
    let result = '';
    const characters = '0123456789';
    var charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getUserIdFromHeader(req: Request) : string 
  {
    let idFromHeader = null;
    const reqHeader = req?.headers?.authorization || "";
    const token = reqHeader.replace('Bearer ', '');
    try {
      verify(token, process.env.JWT_ACCESS_TOKEN_SECRECT, (err, token) => {
        if(err) {
          console.log(err);
        } else {
          idFromHeader = token;
        }
      })
      return idFromHeader.id;
    }  catch(e) {
      return "";
    }
  }
}
