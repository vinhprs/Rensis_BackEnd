import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CreateExpectationInput } from './dto/create-expectation.input';
import { UpdateExpectationInput } from './dto/update-expectation.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Expectation } from './entities/expectation.entity';
import { Repository } from 'typeorm';
import { ProfilesService } from '../profiles/profiles.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class ExpectationsService {
  constructor(
    @InjectRepository(Expectation)
    private readonly expectationsRepository: Repository<Expectation>,
    private readonly profileService: ProfilesService,
    @Inject(forwardRef(() => UsersService))
    private readonly userSerivce: UsersService
  ) {}

  async autoGenExpectation(userId: string)
  : Promise<void> { 
    const user = await this.userSerivce.getUserById(userId);
    const profile = user.Profile;
    const expectation = new Expectation();
    expectation.Profile = profile;

    await this.expectationsRepository.save(expectation);
  }

  async updateExpectation(updateExpectation: UpdateExpectationInput)
  : Promise<Expectation> {
    if(Object.keys(updateExpectation).length === 0) {
      throw new BadRequestException('Please provide updated input!');
    }
    const { Expectation_ID } = updateExpectation;
    const expectation = await this.expectationsRepository.findOne({
      where: {
        Expectation_ID
      }
    });
    
    if(!expectation) {
      throw new BadRequestException('Please create expectation before update!');
    }

    await this.expectationsRepository
    .update({Expectation_ID}, updateExpectation);
    return expectation; 
  }

  async getExpectation(userId: string)
  : Promise<Expectation> {
    const profile = await this.profileService.getProfileByUserId(userId);
    return profile.Expectations;
  }
}
