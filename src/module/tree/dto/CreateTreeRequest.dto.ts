import { ApiProperty } from "@nestjs/swagger";

export class CreateTreeRequestDto{
    @ApiProperty({
        type:Number,
        example:123
    })
    user_id:number;
    @ApiProperty({
        type:Number,
        example:'Tree Name'
    })
    tree_name:string;

}