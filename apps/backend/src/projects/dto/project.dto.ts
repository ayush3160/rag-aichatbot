import { IsString, IsUrl, MinLength } from "class-validator"

export class ProjectDto {
    @IsString()
    @MinLength(3)
    name: string

    @IsUrl()
    website : string

    @IsString()
    description : string
}