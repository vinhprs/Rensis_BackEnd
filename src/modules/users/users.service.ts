import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ActivateAccountInput, LoginInput, SignupInput } from '../../auth/dto/auth.input';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getAllUsers()
  : Promise<User[]> {
    return await this.userRepository.find();
  }
  async getUserById(User_ID: string)
  : Promise<User> {
    const user = await this.userRepository.findOne({
      where: { User_ID }
    });

    return user;
  }

  async getUserByEmail(Email: string)
  : Promise<User> {
    const user = await this.userRepository.findOne({
      where: { Email }
    })

    return user;
  }

  async signup(signupInput: SignupInput, random: string)
  : Promise<User> {
    const user = this.userRepository.create(signupInput);
    [ user.Password, user.Otp ] = await Promise.all([
      bcrypt.hash(signupInput.Password, 12),
      bcrypt.hash(random, 12)
    ]);

    return await this.userRepository.save(user);
  }

  async validateLoginInput(loginInput: LoginInput)
  : Promise<User> {
    const { Email, Password } = loginInput;
    const user = await this.getUserByEmail(Email);
    if(!user) {
      throw new NotFoundException('This email is not registered!')
    }
    if(!user.isActivate) {
      throw new UnauthorizedException('Please activate your account before login!')
    }
    const isMatch = await bcrypt.compare(Password, user.Password);
    if(!isMatch) {
      throw new UnauthorizedException('Incorrect password!')
    }
    if(user?.isBlocked) {
      throw new ForbiddenException('This account is blocked')
    }

    return user;
  }

  async activate(activateInput: ActivateAccountInput)
  : Promise<boolean> {
    const user = await this.getUserByEmail(activateInput.Email);
    if(!user) {
      throw new NotFoundException('Cannot find user')
    }
    if(!user.Otp) {
      return false;
    }
    const isMatch = await bcrypt.compare(activateInput.Otp, user.Otp);
    if(!isMatch) {
      throw new UnauthorizedException('Invalid otp code')
    }
    user.Otp = null;
    user.isActivate = true;

    return await this.userRepository.save(user) ? true: false;
  }

}
