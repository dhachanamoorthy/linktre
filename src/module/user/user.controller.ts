import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  InternalServerErrorException,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
} from "@nestjs/swagger";
import { SuccessPipe } from "src/pipes/responsePipe";
import { AuthGuard } from "../guard/auth.guard";
import { CODE, MSG } from "./contants";
import { CreateUserRequestDto } from "./dto/createUser.request.dto";
import { UpdateUserRequestDto } from "./dto/updateUser.request.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    description: "Api to create user",
  })
  @ApiCreatedResponse({
    description: "Registered User Successfully",
  })
  @ApiBearerAuth("JWT-auth")
  async createUser(
    @Res() res,
    @Body() body: CreateUserRequestDto
  ): Promise<any> {
    try {
      let result = await this.userService.addUser(body);
      return new SuccessPipe().Created(
        res,
        CODE.USER_CREATE_SUCCESS,
        MSG.USER_CREATE_SUCCESS,
        result
      );
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  @Get("/:id")
  @HttpCode(200)
  @ApiOperation({
    description: "Api to get user",
  })
  @ApiCreatedResponse({
    description: "Fetched Users Successfully",
  })
  @ApiBearerAuth("JWT-auth")
  async getUser(@Res() res, @Param("id", ParseIntPipe) id: number) {
    try {
      let result = await this.userService.getUser(id);
      return new SuccessPipe().Ok(
        res,
        CODE.USER_FETCH_SUCCESS,
        MSG.USER_FETCH_SUCCESS,
        result
      );
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    description: "Api to get all user",
  })
  @ApiCreatedResponse({
    description: "Fetched Users Successfully",
  })
  @ApiBearerAuth("JWT-auth")
  @UseGuards(AuthGuard)
  async getAllUsers(@Res() res) {
    try {
      let result = await this.userService.getAllUsers();
      return new SuccessPipe().Ok(
        res,
        CODE.USER_FETCH_SUCCESS,
        MSG.USER_FETCH_SUCCESS,
        result
      );
    } catch (err) {
      Logger.error(err);
      throw err;
    }
  }

  @Patch("/:id")
  @HttpCode(200)
  @ApiOperation({
    description: "Api to update user",
  })
  @ApiCreatedResponse({
    description: "User Updated Successfully",
  })
  @ApiBearerAuth("JWT-auth")
  async updateUser(
    @Res() res,
    @Param("id", ParseIntPipe) id: number,
    @Body() payload: UpdateUserRequestDto
  ) {
    try {
      let result = this.userService.updateUser(id, payload);
      return new SuccessPipe().Ok(
        res,
        CODE.USER_UPDATED_SUCCESS,
        MSG.USER_UPDATED_SUCCESS,
        result
      );
    } catch (err) {
      throw err;
    }
  }

  @Delete("/:id")
  @HttpCode(200)
  @ApiOperation({
    description: "Api to delete user",
  })
  @ApiCreatedResponse({
    description: "User Updated Successfully",
  })
  @ApiBearerAuth("JWT-auth")
  async deleteUser(@Res() res, @Param("id", ParseIntPipe) id: number) {
    try {
      let result = this.userService.deleteUser(id);
      return new SuccessPipe().Ok(
        res,
        CODE.USER_DELETE_SUCCESS,
        MSG.USER_DELETE_SUCCESS,
        result
      );
    } catch (err) {
      throw err;
    }
  }
  @Get("/:id/trees")
  @HttpCode(200)
  @ApiOperation({
    description: "Api to get all trees associated with user",
  })
  @ApiCreatedResponse({
    description: "Trees Fetched Successfully",
  })
  @ApiBearerAuth("JWT-auth")
  async getAllTrees(@Res() res, @Param("id", ParseIntPipe) id: number) {
    try {
      let result =await this.userService.getAllTrees(id);
      return new SuccessPipe().Ok(
        res,
        CODE.GET_ALL_ASSOC_TREES,
        MSG.GET_ALL_ASSOC_TREES,
        result
      );
    } catch (err) {
      throw err;
    }
  }
}
