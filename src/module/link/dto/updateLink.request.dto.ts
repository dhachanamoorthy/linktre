import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateLinkRequestDto {
  @ApiProperty({
    type: String,
    example: "My Link",
  })
  @IsOptional()
  link_name: string;
  @ApiProperty({
    type: String,
    example: "www.google.com",
  })
  @IsOptional()
  link_url: string;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  disabled: boolean;
}
