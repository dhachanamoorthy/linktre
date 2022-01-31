import { Module } from "@nestjs/common";
import { SequelizeModule } from "src/sequelize/sequelize.module";
import { TreeController } from "./tree.controller";
import { TreeDaoService } from "./tree.dao.service";
import { treeProviders } from "./tree.provider";
import { TreeService } from "./tree.service";

@Module({
    imports:[SequelizeModule],
    controllers:[TreeController],
    providers:[TreeService,TreeDaoService,...treeProviders]
})

export class TreeModule{}