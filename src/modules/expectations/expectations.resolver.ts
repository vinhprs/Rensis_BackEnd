import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ExpectationsService } from './expectations.service';
import { Expectation } from './entities/expectation.entity';
import { CreateExpectationInput } from './dto/create-expectation.input';
import { UpdateExpectationInput } from './dto/update-expectation.input';

@Resolver(() => Expectation)
export class ExpectationsResolver {
  constructor(private readonly expectationsService: ExpectationsService) {}

  @Mutation(() => Expectation)
  createExpectation(@Args('createExpectationInput') createExpectationInput: CreateExpectationInput) {
    return this.expectationsService.create(createExpectationInput);
  }

  @Query(() => [Expectation], { name: 'expectations' })
  findAll() {
    return this.expectationsService.findAll();
  }

  @Query(() => Expectation, { name: 'expectation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.expectationsService.findOne(id);
  }

  @Mutation(() => Expectation)
  updateExpectation(@Args('updateExpectationInput') updateExpectationInput: UpdateExpectationInput) {
    return this.expectationsService.update(updateExpectationInput.id, updateExpectationInput);
  }

  @Mutation(() => Expectation)
  removeExpectation(@Args('id', { type: () => Int }) id: number) {
    return this.expectationsService.remove(id);
  }
}
