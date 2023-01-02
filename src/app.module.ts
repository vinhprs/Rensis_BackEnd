import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { GraphqlService } from './configs/graphql.config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormService } from './configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';

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
    })
    ,
    UsersModule,
    AuthModule
  ],
  // providers: [{
  //   provide: APP_GUARD,
  //   useClass: RolesGuard
  // }]
})
export class AppModule {}
