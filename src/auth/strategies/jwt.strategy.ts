import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { IJwtPayload } from "../../common/entities/common.entity";
import { User } from "../../modules/users/entities/user.entity";
import { UsersService } from "../../modules/users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor( private readonly userService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                ExtractJwt.fromAuthHeaderAsBearerToken()
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_ACCESS_TOKEN_SECRECT
        })
    }

    async validate(payload: IJwtPayload) : Promise<User> {
        try {
            const user: User = await this.userService.getUserById(payload.id);
            if(!user || !user.isActivate) {
                throw new UnauthorizedException("Please login!")
            }
            return user;
        } catch(e) {
            throw new UnauthorizedException(e)
        }
    }
}