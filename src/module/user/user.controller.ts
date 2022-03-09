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
	UseGuards,
} from "@nestjs/common";
import {
	ApiBearerAuth,
	ApiCreatedResponse,
	ApiOperation,
	ApiParam,
} from "@nestjs/swagger";
import { AuthGuard } from "../guard/auth.guard";
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
	async createUser(@Body() body: CreateUserRequestDto): Promise<any> {
		try {
			let result = await this.userService.addUser(body);
			return result;
		} catch (err) {
			Logger.error(err);
			throw new InternalServerErrorException("User Registration Failed");
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
	async getUser(@Param("id", ParseIntPipe) id: number) {
		try {
			let result = await this.userService.getUser(id);
			return result;
		} catch (err) {
			Logger.error(err);
			throw new InternalServerErrorException();
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
	async getAllUsers() {
		try {
			let result = await this.userService.getAllUsers();
			return result;
		} catch (err) {
			Logger.error(err);
			throw new InternalServerErrorException();
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
	async updateUser(
		@Param("id", ParseIntPipe) id: number,
		@Body() payload: UpdateUserRequestDto
	) {
		try {
			return this.userService.updateUser(id, payload);
		} catch (err) {
			throw new InternalServerErrorException("Internal Server Error");
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
	async deleteUser(@Param("id", ParseIntPipe) id: number) {
		try {
			return this.userService.deleteUser(id);
		} catch (err) {
			throw new InternalServerErrorException("Internal Server Error");
		}
	}
}
