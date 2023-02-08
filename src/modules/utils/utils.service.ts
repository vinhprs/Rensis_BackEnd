import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';

@Injectable()
export class UtilsService {
  randomOtp(length: number): string {
    const result = Math.random().toString().slice(2, length + 2)
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
