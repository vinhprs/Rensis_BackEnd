import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { Profile } from '../profiles/entities/profiles';
import { ProfilesService } from '../profiles/profiles.service';
import { UtilsService } from '../utils/utils.service';
import { CreateEducationInput } from './dto/create-education.input';
import { Education } from './entities/education.entity';

@Injectable()
export class EducationsService {
  constructor(
    @InjectRepository(Education)
    private readonly educationRepository: Repository<Education>,
    private readonly profileService: ProfilesService,
    private readonly utilsService: UtilsService
  ) {}

  async createEducation(
    createEducationInput: CreateEducationInput,
    req: Request
  ) : Promise<Education> {
    const { Title, Certificate_Place, Level, Graduation_Time } = createEducationInput;
    const userId: string = this.utilsService.getUserIdFromHeader(req);
    const profile: Profile = await this.profileService.getProfileByUserId(userId);

    const newEducation: Education = new Education();
    newEducation.Title = Title;
    newEducation.Certificate_Place = Certificate_Place;
    newEducation.Level = Level;
    newEducation.Graduation_Time = Graduation_Time;
    newEducation.Profile = profile;

    return await this.educationRepository.save(newEducation);
  }
}
