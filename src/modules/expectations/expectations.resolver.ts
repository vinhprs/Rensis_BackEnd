import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExpectationsService } from './expectations.service';
import { Expectation } from './entities/expectation.entity';
import { CreateExpectationInput } from './dto/create-expectation.input';
import { UpdateExpectationInput } from './dto/update-expectation.input';
import { InternalServerErrorException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Resolver(() => Expectation)
export class ExpectationsResolver {
  constructor(
    private readonly expectationsService: ExpectationsService
  ) {}
  
  @Mutation(() => Expectation)
  @UseGuards(JwtAuthGuard)
  async updateExpectation(
    @Args('updateExpectation') updateExpectation: UpdateExpectationInput
  ) : Promise<Expectation> {
    try {
      return await this.expectationsService.updateExpectation(updateExpectation);
    } catch(e) {
      throw new InternalServerErrorException(e.message);
    }
  }

  @Query(() => Expectation)
  async getExpectation(
    @Args('profileID') profileID: string
  ) : Promise<Expectation> {
    try {
      return await this.expectationsService.getExpectation(profileID);
    } catch(e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
