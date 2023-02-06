import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Education } from "../modules/educations/entities/education.entity";
import { ProfileImage } from "../modules/profile-images/entities/profile-image.entity";
import { Expectation } from "../modules/expectations/entities/expectation.entity";
import { Profile } from"../modules/profiles/entities/profiles";
import { User } from "../modules/users/entities/user.entity";

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
    createTypeOrmOptions(): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
        return {
            type: 'mysql',
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            username: process.env.DB_USER_NAME,
            password: process.env.DB_PASS_WORD,
            database: process.env.DB_NAME,
            entities: [
                User,
                Profile,
                ProfileImage,
                Expectation,
                Education
            ],
            synchronize: true
        }
    }
}