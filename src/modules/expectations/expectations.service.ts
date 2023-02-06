import { Injectable } from '@nestjs/common';
import { CreateExpectationInput } from './dto/create-expectation.input';
import { UpdateExpectationInput } from './dto/update-expectation.input';

@Injectable()
export class ExpectationsService {
  create(createExpectationInput: CreateExpectationInput) {
    return 'This action adds a new expectation';
  }

  findAll() {
    return `This action returns all expectations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expectation`;
  }

  update(id: number, updateExpectationInput: UpdateExpectationInput) {
    return `This action updates a #${id} expectation`;
  }

  remove(id: number) {
    return `This action removes a #${id} expectation`;
  }
}
