import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { ForbiddenException, InternalServerErrorException, UseGuards } from '@nestjs/common';
import { Roles } from '../../common/decorators/roles.decorator';
import { Role } from '../../constants/enum';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async getAllUsers(): Promise<User[]> {
    try {
      return await this.usersService.getAllUsers();
    } catch (e) {
      throw new ForbiddenException(e.message);
    }
  }

  @Query(() => User)
  async getUserByID(
    @Args('userID') userId: string
  ): Promise<User> {
    try {
      return await this.usersService.getUserById(userId);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Query(() => User)
  async getUserByEmail(
    @Args('email') email: string
  ) : Promise<User> {
    try {
      return await this.usersService.getUserByEmail(email);
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
