import { Module } from "@nestjs/common";
import { UserController } from "./controller/user.controller";
import { UserServices } from "./services/user-services";

@Module({
    imports: [],
    controllers: [UserController],
    providers: [UserServices],
    exports: [UserServices]
})
export class UserModule { }