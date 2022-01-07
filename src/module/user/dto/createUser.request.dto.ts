import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty,IsOptional} from 'class-validator';
export class CreateUserRequestDto {
  @ApiProperty({ type: String, example: 'Moorthy' })
  username: string;

  @ApiProperty({ type: String, example: 'dhachanamoorthy3@gmail.com' })
  @IsOptional()
  email: string;

  @ApiProperty({ type: String, example: '+917639619985' })
  @IsOptional()
  phone: string;

  @ApiProperty({ type: String, example: 'Moorthy@123' })
  @IsOptional()
  password: string;
}

