import { Module } from '@nestjs/common';
import { EducationsService } from './educations.service';
import { EducationsResolver } from './educations.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from './entities/education.entity';
import { ProfilesModule } from '../profiles/profiles.module';
import { UtilsModule } from '../utils/utils.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Education]),
    ProfilesModule,
    UtilsModule
  ],
  providers: [EducationsResolver, EducationsService]
})
export class EducationsModule {}
