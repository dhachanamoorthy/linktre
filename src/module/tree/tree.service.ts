import { Injectable } from "@nestjs/common";
import { TreeDaoService } from "./tree.dao.service";
@Injectable()
export class TreeService{
   constructor(private readonly treeDaoService: TreeDaoService) {}
    async createTree(payload:any){
        let result = this.treeDaoService.createTree(payload);
        return result;
    }

    async updateTree(id:number,payload:any){
        let result = this.treeDaoService.updateTree(id,payload);
        return result;
    }

    async getTree(id:number){
        let result = this.treeDaoService.getTree(id);
        return result;
    }

    async deleteTree(id:number){
        let result = this.treeDaoService.deleteTree(id);
        return result;
    }
}