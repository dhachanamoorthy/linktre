import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Optional,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { SuccessPipe } from "src/pipes/responsePipe";
import { Public } from "../guard/decorators/public.decorator";
import { CODE, MSG } from "./contants";
import { CreateTreeRequestDto } from "./dto/CreateTreeRequest.dto";
import { UpdateTreeRequestDto } from "./dto/UpdateTreeRequest.dto";
import { TreeService } from "./tree.service";

@ApiTags("Tree")
@Controller("tree")
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    description: "Api to create tree",
  })
  @ApiBearerAuth("JWT-auth")
  async createTree(@Body() payload: CreateTreeRequestDto) {
    try {
      let result = await this.treeService.createTree(payload);
      return result;
    } catch (err) {
      Logger.log(err);
      throw err;
    }
  }

  @Patch("/:id")
  @HttpCode(200)
  @ApiOperation({
    description: "Api to update tree",
  })
  @ApiBearerAuth("JWT-auth")
  async updateTree(
    @Param("id", ParseIntPipe) id: number,
    @Body() payload: UpdateTreeRequestDto
  ) {
    try {
      let result = await this.treeService.updateTree(id, payload);
      return result;
    } catch (err) {
      throw err;
    }
  }

  @Get("/")
  @HttpCode(200)
  @ApiOperation({
    description: "Api to get tree",
  })
  @Public()
  // @ApiBearerAuth("JWT-auth")
  async getTree(
    @Res() res,
    @Query("id") id: number,
    @Query("tree_name") treeName: string
  ) {
    try {
      Logger.log("Enter getTree controller");
      let result;
      if (!treeName) {
        result = await this.treeService.getTree(id);
      } else {
        result = await this.treeService.getTreeByName(treeName);
      }
      return new SuccessPipe().Ok(
              res,
              CODE.TREE_FETCH_SUCCESS,
              MSG.TREE_FETCH_SUCCESS,
              result
            );
    } catch (err) {
      throw err;
    }
  }

  @Delete("/:id")
  @HttpCode(200)
  @ApiOperation({
    description: "Api to delete tree",
  })
  @ApiBearerAuth("JWT-auth")
  async deleteTree(@Param("id", ParseIntPipe) id: number) {
    try {
      let result = await this.treeService.deleteTree(id);
      return result;
    } catch (err) {
      throw err;
    }
  }
  @Get("/:id/links")
  @HttpCode(200)
  @ApiOperation({
    description: "Api to get all links",
  })
  @ApiBearerAuth("JWT-auth")
  async getAlllinks(
    @Res() res,
    @Param("id", ParseIntPipe) id: number,
  ) {
    try {
      let result = await this.treeService.getAllLinks(id);
      return new SuccessPipe().Ok(
              res,
              CODE.LINKS_FETCH_SUCCESS,
              MSG.LINKS_FETCH_SUCCESS,
              result
            );
    } catch (err) {
      throw err;
    }
  }

}
