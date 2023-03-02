import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProfilesService } from './profiles.service';
import { Profile } from './entities/profiles';
import { BadRequestException } from '@nestjs/common';

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
}
