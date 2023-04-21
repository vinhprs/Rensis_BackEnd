import { ForbiddenException, InternalServerErrorException } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { ActivateResponse, ForgotPassResponse, User } from '../modules/users/entities/user.entity';
import { JwtPayload } from '../common/entities/common.entity';
import { AuthService } from './auth.service';
import { ActivateAccountInput, LoginInput, ResetPasswordInput, SignupInput } from './dto/auth.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) { }

  @Mutation(() => JwtPayload)
  async signup(
    @Args('signupInput') signupInput: SignupInput
  ): Promise<JwtPayload> {
    try {
      return await this.authService.signup(signupInput);
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }

  @Mutation(() => JwtPayload)
  async login(
    @Args('loginInput') loginInput: LoginInput
  ): Promise<JwtPayload> {
    try {
      return await this.authService.login(loginInput);
    } catch (e) {
      throw new ForbiddenException(e.message);

    }
  }

  @Mutation(() => ActivateResponse)
  async activateAccount(
    @Args('activateInput') activateInput: ActivateAccountInput
  ): Promise<ActivateResponse> {
    try {
      return await this.authService.activate(activateInput);
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }

  @Mutation(() => ForgotPassResponse)
  async forgotPassword(
    @Args('email') email: string
  ) : Promise<ForgotPassResponse> {
    try {
      return await this.authService.forgotPassword(email);
    } catch(e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Mutation(() => User) 
  async resetPassword(
    @Args('resetPasswordInput') resetPasswordInput: ResetPasswordInput
  ) : Promise<User> {
    try {
      return this.authService.resetPassword(resetPasswordInput);
    } catch(e) {
      throw new ForbiddenException(e.message);
    }
  }
}
