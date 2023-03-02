import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CreateProfileInput } from './dto/create-profile.input';
import { Profile } from './entities/profiles';
import { ProfileImage } from '../profile-images/entities/profile-image.entity';
import { Request } from 'express';
import { UtilsService } from '../utils/utils.service';
import { ProfileImagesService } from '../profile-images/profile-images.service';
import { UploadImageInput } from './dto/uploadImage.input';
import { FileUpload } from 'src/common/interfaces/common.interface';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
    private readonly utilsService: UtilsService,
    @Inject(forwardRef(() => ProfileImagesService))
    private readonly profileImagesService: ProfileImagesService
  ) {}

  async getProfileById(profileId: string)
  : Promise<Profile> {
    const profile: Profile = await this.profilesRepository.findOne({
      where: { Profile_ID: profileId }
    })
    return profile;
  }

  async getProfileByUserId(
    userId: string
  ) : Promise<Profile> {
    const profile: Profile = await this.profilesRepository.findOne({
      where: {User: {
        User_ID: userId
      }}
    });
    return profile;
  }

  async createProfile(
    createProfileInput: CreateProfileInput
  ) : Promise<Profile> {
    const profile: Profile = this.profilesRepository.create(createProfileInput);

    return await this.profilesRepository.save(profile);
  }

  async autoGenProfile(
    user: User
  ) : Promise<void> {
    const profile: Profile = new Profile();
    profile.User = user;
    profile.Profile_Name = user.Email;

    await this.profilesRepository.save(profile);
  }

  async uploadAvatar(
    image: UploadImageInput,
    req: Request
  ): Promise<ProfileImage> {
    const userId: string = this.utilsService.getUserIdFromHeader(req);
    const profile = await this.getProfileByUserId(userId);
    return await this.profileImagesService.uploadProfileAvatar(profile.Profile_ID, image.Avatar);
  }

  async uploadProfileImages(
    images: UploadImageInput,
    req: Request
  ): Promise<ProfileImage[]> {
    const userId: string = this.utilsService.getUserIdFromHeader(req);
    const profile = await this.getProfileByUserId(userId);
    return await this.profileImagesService.uploadProfileImages(profile.Profile_ID, images.Profile_Images);
  } 
  
}
