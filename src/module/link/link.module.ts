import { Module } from "@nestjs/common";
import { SequelizeModule } from "src/sequelize/sequelize.module";
import { LinkController } from "./link.controller";
import { LinkDaoService } from "./link.dao.service";
import { linkProvider } from "./link.provider";
import { LinkService } from "./link.service";

@Module({
  imports: [SequelizeModule],
  controllers: [LinkController],
  providers: [LinkService, LinkDaoService, ...linkProvider],
})
export class LinkModule {}
