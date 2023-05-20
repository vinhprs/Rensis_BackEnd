import { BadRequestException, forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
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
import { UpdateProfileInput } from './dto/updateProfile.input';
import { UsersService } from '../users/users.service';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profilesRepository: Repository<Profile>,
    private readonly utilsService: UtilsService,
    @Inject(forwardRef(() => ProfileImagesService))
    private readonly profileImagesService: ProfileImagesService,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService
  ) {}

  async getProfileById(profileId: string)
  : Promise<Profile> {
    const profile: Profile = await this.profilesRepository.findOne({
      where: { Profile_ID: profileId }
    })
    if(!profile) {
      throw new NotFoundException('Not found profile');
    }
    return profile;
  }

  async getProfileByUserId(userId: string) : Promise<Profile> {
    const user = await this.userService.getUserById(userId);
    const profile = user.Profile;
    if(!profile) {
      throw new NotFoundException('Not found profile!');
    }
    return profile;
  }

  async getCurrentUserProfile(req: Request) : Promise<Profile> {
    const userId = this.utilsService.getUserIdFromHeader(req);
    const currentUserProfile: Profile = await this.getProfileByUserId(userId);
    if(!currentUserProfile) {
      throw new NotFoundException('This account does not have profile yet!');
    }
    return currentUserProfile;
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

  async updateProfileInfo(req: Request, updateProfileInput: UpdateProfileInput)
  : Promise<Profile> {
    if(Object.keys(updateProfileInput).length === 0) {
      throw new BadRequestException('Please provide updated input!');
    }
    const userId = this.utilsService.getUserIdFromHeader(req);
    const profile: Profile = await this.getProfileByUserId(userId);

    await this.profilesRepository
    .update({Profile_ID: profile.Profile_ID}, updateProfileInput);
    
    return profile;
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
