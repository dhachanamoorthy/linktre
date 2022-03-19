import { Injectable } from "@nestjs/common";
import { TreeDaoService } from "./tree.dao.service";
@Injectable()
export class TreeService {
  constructor(private readonly treeDaoService: TreeDaoService) {}
  async createTree(payload: any) {
    let result = await this.treeDaoService.createTree(payload);
    return result;
  }

  async updateTree(id: number, payload: any) {
    let result = await this.treeDaoService.updateTree(id, payload);
    return result;
  }

  async getTree(id: number) {
    let result = await this.treeDaoService.getTree(id);
    return result;
  }

  async getAllTree(user_id: number) {
    let result = await this.treeDaoService.getAllTree(user_id);
    return result;
  }

  async deleteTree(id: number) {
    let result = await this.treeDaoService.deleteTree(id);
    return result;
  }

  async getTreeByName(treeName:String){
    treeName = treeName.toLowerCase();
    let result = await this.treeDaoService.getTreeByName(treeName);
    return result;
  } 
}
