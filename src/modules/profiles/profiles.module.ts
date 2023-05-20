import { forwardRef, Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesResolver } from './profiles.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profiles';
import { UtilsModule } from '../utils/utils.module';
import { ProfileImagesModule } from '../profile-images/profile-images.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    UtilsModule,
    forwardRef(() => ProfileImagesModule),
    forwardRef(() => UsersModule)
  ],
  providers: [ProfilesResolver, ProfilesService],
  exports: [ProfilesService]
})
export class ProfilesModule {}
