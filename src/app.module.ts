import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphqlService } from './configs/graphql.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormService } from './configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { UploadModule } from './modules/upload/upload.module';
import { EmailModule } from './modules/email/email.module';
import { UtilsModule } from './modules/utils/utils.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { ExpectationsModule } from './modules/expectations/expectations.module';
import { ProfileImagesModule } from './modules/profile-images/profile-images.module';
import { EducationsModule } from './modules/educations/educations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GraphqlService
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeormService
    }),
    UsersModule,
    AuthModule,
    UploadModule,
    EmailModule,
    UtilsModule,
    ProfilesModule,
    ExpectationsModule,
    ProfileImagesModule,
    EducationsModule
  ],
})
export class AppModule {}
