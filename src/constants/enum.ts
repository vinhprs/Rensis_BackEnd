import { registerEnumType } from "@nestjs/graphql";

export enum Role {
    ADMIN = "ADMIN",
    BABY = "BABY",
    VIP_BABY = "VIP_BABY",
    PREMIUM_BABY = "PREMIUM_BABY",
    NANY = "NANY",
    VIP_NANY = "VIP_NANY",
    PREMIUM_NANY = "PREMIUM_NANY",
    
}
registerEnumType(Role, {
    name: "Role"
})