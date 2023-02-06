import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { Profile } from './entities/profiles';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile> 
  ) {}

  async getProfileById(profileId: string)
  : Promise<Profile> {
    const profile = await this.profilesRepository.findOne({
      where: { Profile_ID: profileId }
    })
    return profile;
  }

  async createProfile(
    createProfileInput: CreateProfileInput
  ) : Promise<Profile> {
    const profile = this.profilesRepository.create(createProfileInput);

    return await this.profilesRepository.save(profile);
  }

  async autoGenProfile(
    user: User
  ) : Promise<void> {
    const profile = new Profile();
    profile.User = user;
    profile.Profile_Name = user.Email;

    await this.profilesRepository.save(profile);
  }
}
