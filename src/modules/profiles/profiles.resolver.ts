import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profiles';
import { BadRequestException, UseGuards } from '@nestjs/common';
import { ProfileImage } from '../profile-images/entities/profile-image.entity';
import { Request } from 'express';
import { UploadImageInput } from './dto/uploadImage.input';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Resolver(() => Profile)
export class ProfilesResolver {
  constructor(
    private readonly profilesService: ProfilesService
  ) {}

  @Query(() => Profile)
  async getProfileById(
    @Args("Profile_ID") profileId: string
  ) : Promise<Profile> {
    try {
      return await this.profilesService.getProfileById(profileId);
    } catch(e) {
      throw new BadRequestException(e.message);
    }
  }

  @Query(() => Profile)
  @UseGuards(JwtAuthGuard)
  async getCurrentUserProfile(
    @Context('req') req: Request
  ) : Promise<Profile> {
    try {
      return await this.profilesService.getCurrentUserProfile(req);
    } catch(e) {
      throw new BadRequestException(e.message);
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
      throw new BadRequestException(e.message);
    }
  }

  @Mutation(() => [ProfileImage])
  @UseGuards(JwtAuthGuard)
  async uploadProfileImages(
    @Args('images') images: UploadImageInput,
    @Context('req') req: Request
  ) : Promise<ProfileImage[]> {
    try {
      return await this.profilesService.uploadProfileImages(images, req);
    } catch(e) {
      throw new BadRequestException(e.message);
    }
  }
}
