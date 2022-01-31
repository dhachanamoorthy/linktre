import { ApiProperty } from "@nestjs/swagger";

export class UpdateTreeRequestDto{
    @ApiProperty({
        type:String,
        example:'Promotion'
    })
    tree_name:string
}