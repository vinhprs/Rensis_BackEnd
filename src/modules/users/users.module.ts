import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProfilesModule } from '../profiles/profiles.module';
import { ExpectationsModule } from '../expectations/expectations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => ExpectationsModule),
    forwardRef(() => ProfilesModule)
  ],
  providers: [UsersResolver, UsersService],
  exports: [UsersService]
})
export class UsersModule {}
