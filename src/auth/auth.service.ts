import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../common/entities/common.entity';
import { UsersService } from '../modules/users/users.service';
import { ActivateAccountInput, LoginInput, SignupInput } from './dto/auth.input';
import { sign } from 'jsonwebtoken';
import { ActivateResponse, User } from '../modules/users/entities/user.entity';
import { EmailService } from '../modules/email/email.service';
import { UtilsService } from '../modules/utils/utils.service';
import { SendEmailResponse } from 'src/modules/email/entites/email.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly emailService: EmailService,
    private readonly utilsService: UtilsService
  ) {}

  async signup(signupInput: SignupInput)
  : Promise<JwtPayload> {
    const existEmail: User = await this.userService.getUserByEmail(signupInput.Email);
    if(existEmail) {
      throw new UnauthorizedException("This email is exist!")
    }
    const random: string = this.utilsService.randomOtp(6);
    const user: User = await this.userService.signup(signupInput, random);
    const [ email, token ] = await Promise.all([
      this.emailService.sendVerifyEmail(user.Email, random),
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
    const user: User= await this.userService.getUserById(userId);
    const jwt : JwtPayload = new JwtPayload();
    jwt.Access_Token = accessToken;
    jwt.User = user;

    return jwt;
  }

  async activate(activateInput: ActivateAccountInput)
  : Promise<ActivateResponse> {
    return await this.userService.activate(activateInput);
  }

}
