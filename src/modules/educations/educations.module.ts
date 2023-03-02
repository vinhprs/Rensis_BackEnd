import { Module } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { EducationsResolver } from './educations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Education])
  ],
  providers: [EducationsResolver, EducationsService]
})
export class EducationsModule {}
