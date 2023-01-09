import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Role } from "../../constants/enum";
import { User } from "../../modules/users/entities/user.entity";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private reflector: Reflector
    ) {}

    canActivate(context: ExecutionContext):
     boolean | Promise<boolean> | Observable<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const request = ctx.getContext().req;
        if(!request.user) {
            return false;
        }
        const user: User = request.user;
        const requiredRole: Role[] = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if(!requiredRole) {
            return true;
        }
        if(user?.Role === Role.ADMIN) {
            return true;
        }

        return requiredRole.some((permission) => {
            // if(permission === Role.ADMIN && user?.Role !== Role.ADMIN) {
            //     return false;
            // }
            if(user?.Role.includes(permission)) {
                return true;
            } else {
                throw new UnauthorizedException(`Need ${permission} role to access this resource`)
            }
        })
    }
}