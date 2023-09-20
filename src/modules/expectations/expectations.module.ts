import { Module, forwardRef } from '@nestjs/common';
import { ExpectationsService } from './expectations.service';
import { ExpectationsResolver } from './expectations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expectation } from './entities/expectation.entity';
import { ProfilesModule } from '../profiles/profiles.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expectation]),
    ProfilesModule,
    forwardRef(() => UsersModule)
  ],
  providers: [ExpectationsResolver, ExpectationsService],
  exports: [ExpectationsService]
})
export class ExpectationsModule {}
