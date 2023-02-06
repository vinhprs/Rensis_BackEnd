import { Injectable } from '@nestjs/common';
import { CreateProfileImageInput } from './dto/create-profile-image.input';
import { UpdateProfileImageInput } from './dto/update-profile-image.input';

@Injectable()
export class ProfileImagesService {
  create(createProfileImageInput: CreateProfileImageInput) {
    return 'This action adds a new profileImage';
  }

  findAll() {
    return `This action returns all profileImages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profileImage`;
  }

  update(id: number, updateProfileImageInput: UpdateProfileImageInput) {
    return `This action updates a #${id} profileImage`;
  }

  remove(id: number) {
    return `This action removes a #${id} profileImage`;
  }
}
