import { Injectable, Logger } from "@nestjs/common";
import { LinkDaoService } from "./link.dao.service";

@Injectable()
export class LinkService {
  constructor(private readonly linkDaoService: LinkDaoService) {}
  async createLink(payload: any) {
    Logger.log("Enter link service");
    let result = await this.linkDaoService.createLink(payload);
    return result;
  }

  async getLink(id: number) {
    let result = await this.linkDaoService.getLink(id);
    return result;
  }

  async updateLink(id: number, payload: any) {
    let result = await this.linkDaoService.updateLink(id, payload);
    return result;
  }

  async deleteLink(id: number) {
    let result = await this.linkDaoService.deleteLink(id);
    return result;
  }
}
