import { ApiProperty } from "@nestjs/swagger";

export class CreateLinkRequestDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  tree_id: number;
  @ApiProperty({
    type: String,
    example: "My Portfolio",
  })
  link_name: string;

  @ApiProperty({
    type: String,
    example: "https://dhachanamoorthy.github.io",
  })
  link_url: string;
}
