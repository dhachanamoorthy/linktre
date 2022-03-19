import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { NotFoundError } from "rxjs";
import * as util from "src/constant";
import { links } from "./models";

@Injectable()
export class LinkDaoService {
  constructor(
    @Inject("SEQUELIZE") private readonly sequelize,
    @Inject(util.LINK_REPOSITORY)
    private readonly linkRepository: typeof links
  ) {}

  async createLink(payload: any) {
    try {
      let result = await this.linkRepository.create(payload);
      return result;
    } catch (err) {
      Logger.log(err);
      throw new InternalServerErrorException(util.INTERNAL_ERR);
    }
  }
  async getLink(id: number) {
    try {
      let result = await this.linkRepository.findOne({
        where: {
          id: id,
        },
      });
      if (!result) {
        throw new NotFoundException(util.NO_DATA);
      }
      return result;
    } catch (err) {
      Logger.log(err);
      throw new InternalServerErrorException(util.INTERNAL_ERR);
    }
  }
  async getAllLinks(tree_id: number) {
    try {
      Logger.log("Enter", "getAllLinks");
      let result = await this.linkRepository.findAll({
        where: {
          tree_id: tree_id,
          deleted_at: null,
        },
      });
      if (!result) {
        throw new NotFoundException(util.NO_DATA);
      }
      return result;
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(util.INTERNAL_ERR);
    }
  }
  async updateLink(id: number, payload: any) {
    try {
      console.log(payload);
      let result = await this.linkRepository.update(payload, {
        where: {
          id: id,
        },
      });
      return result;
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(util.INTERNAL_ERR);
    }
  }

  async deleteLink(id: number) {
    try {
      let result = await this.linkRepository.update(
        {
          deleted_at: new Date(),
        },
        {
          where: {
            id: id,
          },
        }
      );
      return result;
    } catch (err) {
      throw new InternalServerErrorException(util.INTERNAL_ERR);
    }
  }
}
