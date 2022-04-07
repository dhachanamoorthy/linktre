import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import * as util from "../../constant";
import { links } from "../link/models";
import { trees } from "./models/tree.entity";
const Sequelize = require("sequelize");
@Injectable()
export class TreeDaoService {
  constructor(
    @Inject("SEQUELIZE") private readonly sequelize,
    @Inject(util.TREE_REPOSITORY)
    private readonly treeRepository: typeof trees
  ) {}

  async createTree(payload: any) {
    try {
      payload.created_at = new Date().toUTCString();
      let result = await this.treeRepository.create(payload);
      return result;
    } catch (err) {
      Logger.log(err);
      throw new InternalServerErrorException(util.INTERNAL_ERR, err);
    }
  }

  async updateTree(id: number, payload: any) {
    try {
      let result = this.treeRepository.update(payload, {
        where: {
          id: id,
        },
      });
      if (!result) {
        throw new NotFoundException(util.NO_DATA);
      }
    } catch (err) {
      Logger.log(err);
      throw new InternalServerErrorException(util.INTERNAL_ERR, err);
    }
  }

  async getTree(id: number) {
    try {
      let result = this.treeRepository.findOne({
        attributes: ["id", "user_id", "created_at"],
        where: {
          id: id,
          deleted_at: null,
        },
      });
      if (result === null) {
        throw new NotFoundException(util.NO_DATA);
      }
      return result;
    } catch (err) {
      Logger.log(err);
      throw new InternalServerErrorException(util.INTERNAL_ERR);
    }
  }

  async deleteTree(id: number) {
    try {
      let result = this.treeRepository.update(
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
      Logger.log(err);
      throw new InternalServerErrorException(util.INTERNAL_ERR);
    }
  }

  async getTreeByName(treeName: any) {
    try {
      // let result = await this.treeRepository.findOne({
      //   attributes: ["tree_name"],
      //   where: {
      //     tree_name: this.sequelize.fn('LOWER',this.sequelize.col("tree_name"),)
      //   },
      // });
      let result = await this.sequelize.query(
        `select id,tree_name from trees where lower(tree_name) = '${treeName}'`,
        {
          type: "SELECT",
        }
      );
      if (!result) {
        throw new NotFoundException(util.NO_DATA);
      }
      return result;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getAllLinks(treeId) {
    try {
      let result = await this.treeRepository.findOne({
        include: [
          {
            model: links,
            attributes: ["id", "link_name", "link_url", "disabled"],
            where: {
              deleted_at: null,
            },
          },
        ],
        attributes: ["id", "tree_name"],
        where: {
          id: treeId,
          deleted_at: null,
        },
      });
      return result;
    } catch (err) {
      throw err;
    }
  }
}
