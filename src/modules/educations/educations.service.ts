import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { Profile } from '../profiles/entities/profiles';
import { ProfilesService } from '../profiles/profiles.service';
import { UtilsService } from '../utils/utils.service';
import { CreateEducationInput } from './dto/create-education.input';
import { UpdateEducationInput } from './dto/update-education.input';
import { DeleteEducationResponse, Education } from './entities/education.entity';

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
    const profile: Profile = await this.profileService.getProfileFromHeader(req);

    const newEducation: Education = this.educationRepository.create();
    newEducation.Title = Title;
    newEducation.Certificate_Place = Certificate_Place;
    newEducation.Level = Level;
    newEducation.Graduation_Time = Graduation_Time;
    newEducation.Profile = profile;

    return await this.educationRepository.save(newEducation);
  }

  async getEducationById(Education_ID: string)
  : Promise<Education> {
    const education: Education = await this.educationRepository.findOne({
      where: {
        Education_ID
      }
    });

    return education;
  }

  async checkEducationOwner(
    Education_ID: string,
    req: Request
  ) : Promise<boolean> {
    const [ profile, education ] = await Promise.all([
      this.profileService.getProfileFromHeader(req),
      this.getEducationById(Education_ID)
    ]);

    if(profile.Profile_ID !== education.Profile.Profile_ID) {
      return false;
    }
    return true;
  }

  async getAllEducation(
    profileId: string
  ) : Promise<Education[]> {
    const educations: Education[] = await this.educationRepository.find({
      where: {
        Profile: {
          Profile_ID: profileId
        }
      }
    });

    return educations;
  }

  async updateEducation(
    updateEducationInput: UpdateEducationInput,
    req: Request
  ): Promise<Education> {
    const { Education_ID } = updateEducationInput;

    if(!this.checkEducationOwner(Education_ID, req)) {
      throw new ForbiddenException("You can only update your education!");
    };

    return this.educationRepository.update(Education_ID, updateEducationInput)
      .then(async() => await this.getEducationById(Education_ID))
      .catch((error) => Promise.reject(error));
  }

  async deleteEducation(
    educationId: string,
    req: Request
  ) : Promise<DeleteEducationResponse> {
    if(!this.checkEducationOwner(educationId, req)) {
      throw new ForbiddenException("You can only delete your education!");
    };

    const education: Education = await this.getEducationById(educationId);
    education.isDeleted = true;
    return {
      Message: "Delete education succesfully!"
    };
  }
}
