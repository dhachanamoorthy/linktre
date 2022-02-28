import {
  ImATeapotException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  ParseIntPipe,
} from "@nestjs/common";
import { users } from "./models/users.entity";
import * as util from "../../constant";
import * as VError from "verror";
import { UpdateUserRequestDto } from "./dto/updateUser.request.dto";
import { Op } from "sequelize/dist";
@Injectable()
export class UserDaoService {
  constructor(
    @Inject("SEQUELIZE") private readonly sequelize,
    @Inject(util.USER_REPOSITORY)
    private readonly userRepository: typeof users
  ) {}

  async addUser(payload: any) {
    try {
      return await this.userRepository.findOrCreate(payload);
    } catch (err) {
      throw err;
    }
  }

  async getUser(id: number) {
    try {
      const query = {
        attributes: [
          "id",
          "username",
          "email",
          "mobile",
          "image_url",
          "last_login",
        ],
        where: {
          id: id,
          deleted_at: null,
        },
      };
      let result = await this.userRepository.findOne(query);
      if (!result) {
        throw new ImATeapotException("No data Found");
      }
      return result;
    } catch (err) {
      throw new VError(
        {
          name: "GET USER DAO ERROR",
          cause: err,
        },
        "GET USER DAO ERROR"
      );
    }
  }

  async getAllUsers() {
    try {
      const query = {
        attributes: ["id", "username", "email", "mobile", "image_url"],
        where: {
          deleted_at: null,
        },
      };
      let result = await this.userRepository.findAll(query);
      if (!result) {
        throw new ImATeapotException("No data Found");
      }
      return result;
    } catch (err) {
      throw new VError(
        {
          name: "GET USER DAO ERROR",
          cause: err,
        },
        "GET USER DAO ERROR"
      );
    }
  }

  async updateUser(id: number, payload: UpdateUserRequestDto) {
    try {
      const query: any = {
        where: {
          id: id,
        },
      };
      return this.userRepository.update(payload, query);
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  async deleteUser(id: number) {
    try {
      const data = {
        deleted_at: new Date(),
      };
      const query = {
        where: {
          id: id,
        },
      };
      return this.userRepository.update(data, query);
    } catch (err) {
      Logger.log(err);
      throw new InternalServerErrorException("Internal Server Error");
    }
  }
}
