import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty,IsOptional} from 'class-validator';
export class CreateUserRequestDto {
  @ApiProperty({type:String ,example:'308mfp8Az05orMSF4TDbNYdtSbB2'})
  uuid:string;

  @ApiProperty({ type: String, example: 'Moorthy' })
  username: string;

  @ApiProperty({ type: String, example: 'dhachanamoorthy3@gmail.com' })
  @IsOptional()
  email: string;

  @ApiProperty({ type: String, example: '+917639619985' })
  @IsOptional()
  mobile: string;


  @ApiProperty({type:String ,example:"https://someurl"})
  @IsOptional()
  image_url:string;
}

