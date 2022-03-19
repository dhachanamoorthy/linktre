import { Injectable } from "@nestjs/common";
import { UpdateUserRequestDto } from "./dto/updateUser.request.dto";
import { UserDaoService } from "./user.dao.service";
import admin from "firebase-admin";
@Injectable()
export class UserService {
  constructor(private readonly userDaoService: UserDaoService) {}

  async addUser(payload: any) {
    try {
      payload.created_by = "ADMIN";
      payload.created_at = new Date().toUTCString();
      let result = await this.userDaoService.addUser(payload);
      if (result) {
        admin.auth().setCustomUserClaims(payload.uuid, { id: result.id });
      }
      return result;
    } catch (err) {
      throw err;
    }
  }

  async getUser(id: number) {
    let result = await this.userDaoService.getUser(id);
    return result;
  }

  async getAllUsers() {
    let result = await this.userDaoService.getAllUsers();
    return result;
  }

  async updateUser(id: number, payload: UpdateUserRequestDto) {
    let result = await this.userDaoService.updateUser(id, payload);
    return result;
  }

  async deleteUser(id: number) {
    let result = await this.userDaoService.deleteUser(id);
    return result;
  }
}
