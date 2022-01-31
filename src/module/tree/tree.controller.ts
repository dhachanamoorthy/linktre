import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { CreateTreeRequestDto } from "./dto/CreateTreeRequest.dto";
import { UpdateTreeRequestDto } from "./dto/UpdateTreeRequest.dto";
import { TreeService } from "./tree.service";

@ApiTags('Tree')
@Controller("tree")
export class TreeController {
  constructor(private readonly treeService: TreeService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    description: "Api to create tree",
  })
  async createTree(@Body() payload: CreateTreeRequestDto) {
    try {
      let result = await this.treeService.createTree(payload);
      return result;
    } catch (err) {
      Logger.log(err);
      throw new Error("Internal Server Error");
    }
  }

  @Patch("/:id")
  @HttpCode(200)
  @ApiOperation({
    description: "Api to update tree",
  })
  async updateTree(
    @Param("id", ParseIntPipe) id: number,
    @Body() payload: UpdateTreeRequestDto
  ) {
    try {
      let result = await this.treeService.updateTree(id, payload);
      return result;
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Get("/:id")
  @HttpCode(200)
  @ApiOperation({
    description: "Api to get tree",
  })
  async getTree(@Param("id", ParseIntPipe) id: number) {
    try {
      let result = await this.treeService.getTree(id);
      return result;
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }

  @Delete("/:id")
  @HttpCode(200)
  @ApiOperation({
    description: "Api to delete tree",
  })
  async deleteTree(@Param("id", ParseIntPipe) id: number) {
    try {
      let result = await this.treeService.deleteTree(id);
      return result;
    } catch (err) {
      throw new Error("Internal Server Error");
    }
  }
}
