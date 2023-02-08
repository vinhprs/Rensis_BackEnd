import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../modules/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { EmailModule } from '../modules/email/email.module';
import { UtilsModule } from '../modules/utils/utils.module';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.register({
      secret: process.env.JWT_ACCESS_TOKEN_SECRECT,
      signOptions: {
        expiresIn: +process.env.JWT_ACCESS_TOKEN_AGE
      }
    }),
    EmailModule,
    UtilsModule
  ],
  providers: [AuthResolver, AuthService, JwtStrategy]
})
export class AuthModule {}
