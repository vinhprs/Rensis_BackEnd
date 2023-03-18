import { forwardRef, Module } from '@nestjs/common';
import { ProfileImagesService } from './profile-images.service';
import { ProfileImagesResolver } from './profile-images.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileImage } from './entities/profile-image.entity';
import { ProfilesModule } from '../profiles/profiles.module';
import { UploadModule } from '../upload/upload.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileImage]),
    forwardRef(() => ProfilesModule),
    UploadModule
  ],
  providers: [ProfileImagesResolver, ProfileImagesService],
  exports: [ProfileImagesService]
})
export class ProfileImagesModule {}
