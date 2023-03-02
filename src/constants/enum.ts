import { registerEnumType } from "@nestjs/graphql";

export enum Role {
    ADMIN = "ADMIN",
    BABY = "BABY",
    VIP_BABY = "VIP_BABY",
    PREMIUM_BABY = "PREMIUM_BABY",
    NANY = "NANY",
    VIP_NANY = "VIP_NANY",
}
registerEnumType(Role, {
    name: "Role"
})

export enum BabyCharacteristics {
    CONFIDENT = "CONFIDENT",
    DYNAMIC = "DYNAMIC",
    SHY = "SHY",
    DOCILE = "DOCILE",
    NAUGHTY = "NAUGHTY"
}
registerEnumType(BabyCharacteristics, {
    name: "BabyCharacteristics"
})