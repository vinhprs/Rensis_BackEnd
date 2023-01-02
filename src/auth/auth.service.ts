import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { randomOtp } from '../utils/random.util';
import { JwtPayload } from '../common/entities/common.entity';
import { UsersService } from '../modules/users/users.service';
import { ActivateAccountInput, LoginInput, SignupInput } from './dto/auth.input';
import { sign } from 'jsonwebtoken';
import { sendVerifyEmail } from '../utils/send-mail.util';
import { User } from '../modules/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService
  ) {}

  async signup(signupInput: SignupInput)
  : Promise<JwtPayload> {
    const existEmail = await this.userService.getUserByEmail(signupInput.Email);
    if(existEmail) {
      throw new UnauthorizedException("This email is exist!")
    }
    const random = randomOtp(6);
    const user = await this.userService.signup(signupInput, random);
    const [ email, token ] = await Promise.all([
      sendVerifyEmail(user.Email, random),
      this.setJwt(user.User_ID)
    ]);
    if(!email) {
      throw new Error("Send email fail for " + user.Email)
    }
    return token;
  }

  async login(loginInput: LoginInput)
  : Promise<JwtPayload> {
    const user: User = await this.userService.validateLoginInput(loginInput);
    return await this.setJwt(user.User_ID)
   }

  async setJwt(userId: string) : Promise<JwtPayload> {
    const accessToken = sign({id: userId}, process.env.JWT_ACCESS_TOKEN_SECRECT, {
      expiresIn: +process.env.JWT_ACCESS_TOKEN_AGE
    });
    const user = await this.userService.getUserById(userId);
    const jwt : JwtPayload = new JwtPayload();
    jwt.Access_Token = accessToken;
    jwt.User = user;

    return jwt;
  }

  async activate(activateInput: ActivateAccountInput)
  : Promise<boolean> {
    return await this.userService.activate(activateInput);
  }

}
