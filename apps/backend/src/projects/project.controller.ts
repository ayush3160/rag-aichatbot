import { Body, Controller, Get, Param, Post , Request } from "@nestjs/common";
import { ProjectService } from "./project.service";
import { ProjectDto } from "./dto/project.dto";
import { Project } from "src/models/project.entity";
import { UserTokenPayload } from "src/types/types";

@Controller("project")
export class ProjectController {
    
    constructor(private readonly ProjectService : ProjectService) {}

    @Post("create")
    async create(@Body() project : ProjectDto,@Request() req : Request) : Promise<Project> {
        const user : UserTokenPayload = req['user'];

        return this.ProjectService.create(project,user.id);
    }

    @Get("allprojects")
    async allProjects(@Request() req : Request) : Promise<Project[]> {
        const user : UserTokenPayload = req['user'];

        return this.ProjectService.getAllProjectsOfUser(user.id);
    }

    @Get("projectById/:projectId")
    async project(@Request() req : Request,@Param() {projectId} : {projectId : string}) : Promise<Project> {
        const user : UserTokenPayload = req['user'];
        return this.ProjectService.getProjectById(user.id,projectId);
    }

    @Post("edit")
    async edit() {

    }
}