import { Body, Controller, Post } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectDto } from "./dto/project.dto";
import { Project } from "src/models/project.entity";

@Controller("project")
export class ProjectController {
    
    constructor(private readonly ProjectService : ProjectService) {}

    @Post("create")
    async create(@Body() project : ProjectDto) {
        // return "Hello World";
    }

    @Post("edit")
    async edit() {

    }
}