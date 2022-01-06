import { Module } from "@nestjs/common";
import { SequelizeModule } from "src/sequelize/sequelize.module";
import { UserController } from "./user.controller";
import { UserDaoService } from "./user.dao.service";
import { userProviders } from "./user.provider";
import { UserService } from "./user.service";


@Module({
    imports:[SequelizeModule],
    controllers:[UserController],
    providers:[UserService,UserDaoService,...userProviders]
})
export class UserModule {}