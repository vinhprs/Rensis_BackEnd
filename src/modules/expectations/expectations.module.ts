import { Module } from '@nestjs/common';
import { ExpectationsService } from './expectations.service';
import { ExpectationsResolver } from './expectations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expectation } from './entities/expectation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expectation])
  ],
  providers: [ExpectationsResolver, ExpectationsService]
})
export class ExpectationsModule {}
