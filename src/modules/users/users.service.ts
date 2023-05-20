import { ForbiddenException, Inject, Injectable, NotFoundException, UnauthorizedException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivateAccountInput, LoginInput, ResetPasswordInput, SignupInput } from '../../auth/dto/auth.input';
import { Repository } from 'typeorm';
import { ActivateResponse, User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ProfilesService } from '../profiles/profiles.service';
import { ExpectationsService } from '../expectations/expectations.service';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @Inject(forwardRef(() => ProfilesService))
    private readonly profilesService: ProfilesService,
    @Inject(forwardRef(() => ExpectationsService))
    private readonly expectationSerivce: ExpectationsService
  ) {}

  async getAllUsers()
  : Promise<User[]> {
    return await this.userRepository.find();
  }
  async getUserById(User_ID: string)
  : Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { User_ID },
      relations: {
        Profile: true
      }
    });
    if(!user) {
      throw new NotFoundException('Not found user');
    }

    return user;
  }

  async getUserByEmail(Email: string)
  : Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { Email }
    })

    return user;
  }

  async signup(signupInput: SignupInput, random: string)
  : Promise<User> {
    const user: User = this.userRepository.create(signupInput);
    [ user.Password, user.Otp ] = await Promise.all([
      bcrypt.hash(signupInput.Password, 12),
      bcrypt.hash(random, 12)
    ]);

    return await this.userRepository.save(user);
  }

  async validateLoginInput(loginInput: LoginInput)
  : Promise<User> {
    const { Email, Password } = loginInput;
    const user: User = await this.getUserByEmail(Email);
    if(!user) {
      throw new NotFoundException('This email is not registered!')
    }
    if(!user.isActivate) {
      throw new ForbiddenException('Please activate your account before login!')
    }
    const isMatch: boolean = await bcrypt.compare(Password, user.Password);
    if(!isMatch) {
      throw new UnauthorizedException('Incorrect password!')
    }
    if(user?.isBlocked) {
      throw new ForbiddenException('This account is blocked')
    }

    return user;
  }

  async activate(activateInput: ActivateAccountInput)
  : Promise<ActivateResponse> {
    const userId = activateInput.User_ID;
    const user: User = await this.getUserById(userId);
    if(!user) {
      throw new NotFoundException('Cannot find user')
    }
    if(!user.Otp) {
      throw new ForbiddenException("Please provide your email for recieving otp code!");
    }
    const isMatch: boolean = await bcrypt.compare(activateInput.Otp, user.Otp);
    if(!isMatch) {
      throw new ForbiddenException('Invalid otp code')
    }
    user.Otp = null;
    user.isActivate = true;

    await Promise.all([
      this.userRepository.save(user),
      this.profilesService.autoGenProfile(user),
    ]);
    await this.expectationSerivce.autoGenExpectation(userId);
    return {
      Message: "Successfully activate account!",
    }
  }

  async createOtpResetPassword(email: string, otp: string)
  : Promise<User> {
    const user = await this.getUserByEmail(email);
    user.Reset_Password_Otp = otp;

    return await this.userRepository.save(user);
  }

  async validateResetPassInput(resetPasswordInput: ResetPasswordInput)
  : Promise<User> {
    const { userId, newPassword, Otp } = resetPasswordInput;
    const user = await this.getUserById(userId);
    if(!user) {
      throw new NotFoundException('Not found user');
    }
    if(!user.Reset_Password_Otp) {
      throw new ForbiddenException('Please enter your email to receive otp');
    }
    const isMatch: boolean = Otp === user.Reset_Password_Otp;
    if(!isMatch) {
      throw new ForbiddenException('Incorrect otp');
    }
    user.Password = await bcrypt.hash(newPassword, 12);
    user.Reset_Password_Otp = null;

    return await this.userRepository.save(user);
  }

}
