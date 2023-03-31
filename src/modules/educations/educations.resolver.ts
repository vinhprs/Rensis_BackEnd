import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { EducationsService } from './educations.service';
import { DeleteEducationResponse, Education } from './entities/education.entity';
import { CreateEducationInput } from './dto/create-education.input';
import { BadRequestException, ForbiddenException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { UpdateEducationInput } from './dto/update-education.input';

@Resolver(() => Education)
export class EducationsResolver {
  constructor(
    private readonly educationsService: EducationsService
  ) {}
  
  @UseGuards(JwtAuthGuard)
  @Mutation(() => Education)
  async createEducation(
    @Args('createEducationInput') createEducationInput: CreateEducationInput,
    @Context('req') req: Request
  ) : Promise<Education> {
    try {
      return await this.educationsService.createEducation(createEducationInput, req);
    } catch(e) {
      throw new BadRequestException(e.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Education) 
  async updateEducation(
    @Args('updateEducationInput') updateEducationInput: UpdateEducationInput,
    @Context('req') req: Request
  ) : Promise<Education> {
    try {
      return await this.educationsService.updateEducation(updateEducationInput, req);
    } catch(e) {
      throw new ForbiddenException(e.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => DeleteEducationResponse) 
  async deleteEducation(
    @Args('Education_ID') educationId: string,
    @Context('req') req: Request
  ) : Promise<DeleteEducationResponse> {
    try {
      return await this.educationsService.deleteEducation(educationId, req);
    } catch(e) {
      throw new ForbiddenException(e.message);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Education])
  async getAllEducation(
    @Args('profileId') profileId: string
  ) : Promise<Education[]> {
    try {
      return await this.educationsService.getAllEducation(profileId);
    } catch(e) {
      throw new BadRequestException(e.message);
    }
  }
  
}
