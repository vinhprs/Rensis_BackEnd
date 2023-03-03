import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { resolve } from 'path';
import { FileUpload } from 'src/common/interfaces/common.interface';
import { Repository } from 'typeorm';
import { Profile } from '../profiles/entities/profiles';
import { ProfilesService } from '../profiles/profiles.service';
import { UploadService } from '../upload/upload.service';
import { ProfileImage } from './entities/profile-image.entity';

@Injectable()
export class ProfileImagesService {
  constructor(
    @InjectRepository(ProfileImage)
    private readonly profileImagesRepository: Repository<ProfileImage>,
    private readonly uploadService: UploadService,
    @Inject(forwardRef(() => ProfilesService))
    private readonly profileService: ProfilesService
  ) {}

  async uploadProfileAvatar(
    profileId: string, avatar: Promise<FileUpload>
  ): Promise<ProfileImage>  {
    const profileImage: ProfileImage = new ProfileImage();
    profileImage.Image_Url
    = (await this.uploadService.uploadFile(avatar, process.env.CLOUDINARY_PROFILE_FOLDER)).url;
    profileImage.isAvatar = true;
    
    const profile: Profile = await this.profileService.getProfileById(profileId);
    profileImage.Profile = profile;
    return await this.profileImagesRepository.save(profileImage);
  }

  async uploadProfileImages(
    profileId: string, images: Array<Promise<FileUpload>> 
  ) : Promise<ProfileImage[]> {
    const profile: Profile = await this.profileService.getProfileById(profileId);
    
    const uploadedImages: ProfileImage[] = await Promise.all(images.map(async (img) => {
      const profileImage: ProfileImage = new ProfileImage();
      profileImage.Image_Url =  (await this.uploadService.uploadFile(img, process.env.CLOUDINARY_PROFILE_FOLDER)).url;
      profileImage.Profile = profile;
      return await this.profileImagesRepository.save(profileImage);
    }));
    console.log(uploadedImages)

    return uploadedImages;
  }
}