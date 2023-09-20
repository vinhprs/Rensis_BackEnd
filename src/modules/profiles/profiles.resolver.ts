import { Resolver, Query, Mutation, Args, Context, ResolveField, Parent } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profiles';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { ProfileImage } from '../profile-images/entities/profile-image.entity';
import { Request } from 'express';
import { UploadImageInput } from './dto/uploadImage.input';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UpdateProfileInput } from './dto/updateProfile.input';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(
    private readonly profilesService: ProfilesService
  ) {}

  @Query(() => Profile)
  @UseGuards(JwtAuthGuard)
  async getCurrentUserProfile(
    @Context('req') req: Request
  ) : Promise<Profile> {
    try {
      return this.profilesService.getCurrentUserProfile(req);
    } catch(e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Mutation(() => Profile)
  @UseGuards(JwtAuthGuard)
  async updateProfileInfo(
    @Context('req') req: Request,
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput
  ) : Promise<Profile> {
    try {
      return await this.profilesService.updateProfileInfo(req, updateProfileInput);
    } catch(e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Mutation(() => ProfileImage)
  @UseGuards(JwtAuthGuard)
  async uploadAvatar(
    @Args('images') image: UploadImageInput,
    @Context('req') req: Request
  ) : Promise<ProfileImage> {
    try {
      return await this.profilesService.uploadAvatar(image, req);
    } catch(e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Mutation(() => [ProfileImage])
  @UseGuards(JwtAuthGuard)
  async uploadProfileImages(
    @Args('images') images: UploadImageInput,
    @Context('req') req: Request
  ) : Promise<ProfileImage[]> {
    try {
      return this.profilesService.uploadProfileImages(images, req);
    } catch(e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @ResolveField()
  async Profile_Images(
    @Parent() profile: Profile 
  ) : Promise<ProfileImage[]> {
    const result = this.profilesService.getProfileByUserId(profile.Profile_ID);

    return (await result).Profile_Images;
  }

}
