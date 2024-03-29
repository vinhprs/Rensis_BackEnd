import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from '../common/entities/common.entity';
import { UsersService } from '../modules/users/users.service';
import { ActivateAccountInput, LoginInput, ResetPasswordInput, SignupInput } from './dto/auth.input';
import { sign } from 'jsonwebtoken';
import { ActivateResponse, ForgotPassResponse, User } from '../modules/users/entities/user.entity';
import { EmailService } from '../modules/email/email.service';
import { UtilsService } from '../modules/utils/utils.service';

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

  async forgotPassword(email: string)
  : Promise<ForgotPassResponse> {
    const user = await this.userService.getUserByEmail(email);
    if(!user || !user.isActivate) {
      throw new NotFoundException('Not found email!');
    }
    const random: string = this.utilsService.randomOtp(6);
    await Promise.all([
      this.userService.createOtpResetPassword(email, random),
      this.emailService.sendResetPasswordEmail(email, random)
    ]);

    return {
      Message: "An otp code is sent to your email"
    }
  }

  async resetPassword(resetPasswordInput: ResetPasswordInput)
  : Promise<User> {
    return await this.userService.validateResetPassInput(resetPasswordInput);
  }

}
