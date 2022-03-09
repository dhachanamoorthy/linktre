import { Injectable, Logger } from "@nestjs/common";
import { LinkDaoService } from "./link.dao.service";

@Injectable()
export class LinkService {
  constructor(private readonly linkDaoService: LinkDaoService) {}
  async createLink(payload: any) {
    Logger.log("Enter link service");
    return this.linkDaoService.createLink(payload);
  }

  async getLink(id: number) {
    return this.linkDaoService.getLink(id);
  }

  async getAllLinks(tree_id: number) {
    return this.linkDaoService.getAllLinks(tree_id);
  }

  async updateLink(id: number, payload: any) {
    return this.linkDaoService.updateLink(id, payload);
  }
}
