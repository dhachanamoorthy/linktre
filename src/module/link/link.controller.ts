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
  Res,
} from "@nestjs/common";
import { CreateLinkRequestDto } from "./dto/createLink.request.dto";
import { LinkService } from "./link.service";
import * as util from "src/constant";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UpdateLinkRequestDto } from "./dto/updateLink.request.dto";
import { SuccessPipe } from "src/pipes/responsePipe";
import { MSG, CODE } from "./constants";

@ApiTags("Link")
@Controller("link")
export class LinkController {
  constructor(private readonly linkService: LinkService) {}
  @Post("/")
  @ApiOperation({
    description: "Api to create link",
  })
  @ApiBearerAuth("JWT-auth")
  async createLink(@Res() res, @Body() payload: CreateLinkRequestDto) {
    try {
      let result = this.linkService.createLink(payload);

      return new SuccessPipe().Created(
        res,
        CODE.LINK_CREATE_SUCCESS,
        MSG.LINK_CREATE_SUCCESS,
        result
      );
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }
  @Get("/:id")
  @ApiBearerAuth("JWT-auth")
  async getLink(@Res() res, @Param("id") id: number) {
    try {
      let result = await this.linkService.getLink(id);
      return new SuccessPipe().Ok(
        res,
        CODE.LINK_FETCH_SUCCESS,
        MSG.LINK_FETCH_SUCCESS,
        result
      );
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  @Patch("/:id")
  @ApiBearerAuth("JWT-auth")
  async updateLink(
    @Res() res,
    @Param("id") id: number,
    @Body() payload: UpdateLinkRequestDto
  ) {
    try {
      let result = await this.linkService.updateLink(id, payload);
      return new SuccessPipe().Ok(
        res,
        CODE.LINK_UPDATE_SUCCESS,
        MSG.LINK_UPDATE_SUCCESS,
        result
      );
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  @Delete("/:id")
  @ApiBearerAuth("JWT-auth")
  async deleteLink(@Res() res, @Param("id") link_id: number) {
    try {
      let result = await this.linkService.deleteLink(link_id);
      return new SuccessPipe().Ok(
        res,
        CODE.LINK_DELETE_SUCCESS,
        MSG.LINK_DELETE_SUCCESS,
        result
      );
    } catch (err) {
      throw err;
    }
  }
}
