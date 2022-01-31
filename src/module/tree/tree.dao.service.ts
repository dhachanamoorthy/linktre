import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import * as util from "../../constant";
import { tree } from "./models/tree.entity";

@Injectable()
export class TreeDaoService {
  constructor(
    @Inject("SEQUELIZE") private readonly sequelize,
    @Inject(util.TREE_REPOSITORY)
    private readonly treeRepository: typeof tree
  ) {}

  async createTree(payload: any) {
    try {
      payload.created_at = new Date().toUTCString();
      let result = await this.treeRepository.create(payload);
      return result;
    } catch (err) {
      Logger.log(err);
      throw new Error(util.INTERNAL_ERR);
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
        return result;
      } else {
        throw new NotFoundException(util.NO_DATA);
      }
    } catch (err) {
      Logger.log(err)
      throw new InternalServerErrorException(util.INTERNAL_ERR);
    }
  }

  async getTree(id: number) {
    try{
    let result = this.treeRepository.findOne({
      attributes: ["id", "user_id", "created_at"],
      where: {
        id: id,
        deleted_at:null
      },
    });
    if(result===null){
      throw new NotFoundException(util.NO_DATA)
    }
    return result;
  }
  catch(err){
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
      throw new Error(util.INTERNAL_ERR);
    }
  }
}
