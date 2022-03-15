import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateUserRequestDto {
  @ApiProperty({
    type: String,
    example: 'example',
  })
  @IsOptional()
  username: String;


  @ApiProperty({
    type: String,
    example: '+929193932929',
  })
  @IsOptional()
  mobile: String;

  @ApiProperty({
    type: String,
    example: 'example@org.in',
  })
  @IsOptional()
  email:String;

  @ApiProperty({
    type: String,
    example: 'https://www.example.com/image.jpg',
  })
  @IsOptional()
  image_url: String;

  @ApiProperty({
    type: String,
    example: 'https://www.instagram.com/moo.r.thy',
  })
  @IsOptional()
  insta_url: String;

  @ApiProperty({
    type: String,
    example: 'https://www.youtube.com/youtube',
  })
  @IsOptional()
  youtube_url: String;

  @ApiProperty({
    type: String,
    example: 'https://www.facebook.com/user',
  })
  @IsOptional()
  fb_url: String;

  @ApiProperty({
    type: String,
    example: 'https://www.twitter.com/moorthy',
  })
  @IsOptional()
  twitter_url: String;
}
