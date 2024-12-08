import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "../models/project.entity";
import { User } from "../models/user.entity";
import { ProjectDto } from "./dto/project.dto";

@Injectable()
export class ProjectService {

    constructor(
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}
    
    async create(project : ProjectDto , userId : string) : Promise<Project> {
        const user = await this.userRepository.findOne({where : {id : userId}});
        if (!user) {
            throw new Error('User not found');
        }
        const projectEntity = this.projectRepository.create({
            name: project.name,
            description: project.description,
            website: project.website,
            createdBy: user
        });
        return this.projectRepository.save(projectEntity);
    }

    async getAllProjectsOfUser(userId : string) : Promise<Project[]> {
        return this.projectRepository.find({
            where: { createdBy: { id: userId } },
            relations: ['createdBy']
        });
    }

    async edit() {
    
    }
}