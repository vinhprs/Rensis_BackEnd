import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';
import { EducationsService } from './educations.service';
import { Education } from './entities/education.entity';
import { CreateEducationInput } from './dto/create-education.input';
import { UpdateEducationInput } from './dto/update-education.input';
import { BadRequestException } from '@nestjs/common';
import { Request } from 'express';

@Resolver(() => Education)
export class EducationsResolver {
  constructor(
    private readonly educationsService: EducationsService
  ) {}
  
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
}
