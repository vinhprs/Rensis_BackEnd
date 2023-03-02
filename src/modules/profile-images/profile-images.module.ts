import { Module } from '@nestjs/common';
import { ProfileImagesService } from './profile-images.service';
import { ProfileImagesResolver } from './profile-images.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileImage } from './entities/profile-image.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileImage])
  ],
  providers: [ProfileImagesResolver, ProfileImagesService]
})
export class ProfileImagesModule {}
