import { HttpException, HttpStatus } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { JwtPayload } from '../common/entities/common.entity';
import { AuthService } from './auth.service';
import { ActivateAccountInput, LoginInput, SignupInput } from './dto/auth.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => JwtPayload)
  async signup(
    @Args('signupInput') signupInput: SignupInput
  ) : Promise<JwtPayload> {
    try {
      return await this.authService.signup(signupInput);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @Mutation(() => JwtPayload)
  async login(
    @Args('loginInput') loginInput: LoginInput
  ) : Promise<JwtPayload> {
    try {
      return await this.authService.login(loginInput);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }

  @Mutation(() => Boolean)
  async activateAccount(
    @Args('activateInput') activateInput: ActivateAccountInput
  ) : Promise<boolean> {
    try {
      return await this.authService.activate(activateInput);
    } catch(e) {
      throw new HttpException(e.message, e.status || HttpStatus.FORBIDDEN);
    }
  }
}
