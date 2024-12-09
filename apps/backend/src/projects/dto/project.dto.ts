import { IsString, IsUrl, MinLength } from "class-validator"

export class ProjectDto {
    @IsString()
    @MinLength(3)
    name: string

    website : string

    @IsString()
    description : string
}