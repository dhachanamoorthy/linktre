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
  Req,
  Res,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { CreateUserRequestDto } from './dto/createUser.request.dto';
import { UpdateUserRequestDto } from './dto/updateUser.request.dto';
import { UserService } from './user.service';
import ResponsePipe  from 'src/utils/response.format';
import { ERR, SUCCESS } from './constants';
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({
    description: 'Api to create user',
  })
  @ApiCreatedResponse({
    description: 'Registered User Successfully',
  })
  async createUser(@Body() body: CreateUserRequestDto,
    @Res() res,
    @Req() req
  ): Promise<any> {
    try {
      let result = await this.userService.addUser(body);
      return new ResponsePipe().success(res,SUCCESS.CREATE_USER,result);
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException('User Registration Failed');
    }
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiOperation({
    description: 'Api to get user',
  })
  @ApiCreatedResponse({
    description: 'Fetched Users Successfully',
  })
  async getUser(@Param('id', ParseIntPipe) id: number,@Res() res) {
    try {
      let result = await this.userService.getUser(id);
      return new ResponsePipe().success(res,SUCCESS.GET_USER,result);
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Get()
  @HttpCode(200)
  @ApiOperation({
    description: 'Api to get all user',
  })
  @ApiCreatedResponse({
    description: 'Fetched Users Successfully',
  })
  async getAllUsers(@Res() res) {
    try {
      let result = await this.userService.getAllUsers();
      return new ResponsePipe().success(res,SUCCESS.GET_ALL_USER,result);
    } catch (err) {
      Logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  @Patch('/:id')
  @HttpCode(200)
  @ApiOperation({
    description: 'Api to update user',
  })
  @ApiCreatedResponse({
    description: 'User Updated Successfully',
  })
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUserRequestDto,
    @Res() res
  ) {
    try {
      let result= await this.userService.updateUser(id, payload);
      return new ResponsePipe().success(res,SUCCESS.UPDATE_USER,result);
    } catch (err) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  @Delete('/:id')
  @HttpCode(200)
  @ApiOperation({
    description: 'Api to delete user',
  })
  @ApiCreatedResponse({
    description: 'User Updated Successfully',
  })
  async deleteUser(@Param('id', ParseIntPipe) id: number,@Res() res) {
    try {
      let result =  this.userService.deleteUser(id);
      return new ResponsePipe().success(res,SUCCESS.DELETE_USER,result);
    } catch (err) {
      return new ResponsePipe().error(res,err.code,err.message,ERR.DELETE_USER)
    }
  }
}
