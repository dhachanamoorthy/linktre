import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Logger,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { CreateLinkRequestDto } from "./dto/createLink.request.dto";
import { LinkService } from "./link.service";
import * as util from "src/constant";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateLinkRequestDto } from "./dto/updateLink.request.dto";

@ApiTags("Link")
@Controller("link")
export class LinkController {
  constructor(private readonly linkService: LinkService) {}
  @Post("/")
  @ApiOperation({
    description: "Api to create link",
  })
  async createLink(@Body() payload: CreateLinkRequestDto) {
    try {
      let result = this.linkService.createLink(payload);
      return result;
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(util.INTERNAL_ERR, err);
    }
  }
  @Get("/:id")
  async getLink(@Param("id") id: number) {
    try {
      let result = this.linkService.getLink(id);
      return result;
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(util.INTERNAL_ERR, err);
    }
  }
  @Get("/all/:tree_id")
  async getAllLink(@Param("tree_id") tree_id: number) {
    try {
      let result = this.linkService.getAllLinks(tree_id);
      return result;
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(util.INTERNAL_ERR, err);
    }
  }

  @Patch("/:id")
  async updateLink(
    @Param("id") id: number,
    @Body() payload: UpdateLinkRequestDto
  ) {
    try {
      let result = this.linkService.updateLink(id, payload);
      return result;
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException(util.INTERNAL_ERR, err);
    }
  }

  @Delete("/:id")
  async deleteLink(@Param("id") link_id:number){
    try{
      let result = this.linkService.deleteLink(link_id);
      return result;
    }
    catch(err){
      throw err;
    }
  }
}
