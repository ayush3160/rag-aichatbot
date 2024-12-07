import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Project } from "../models/project.entity";

@Injectable()
export class ProjectService {

    constructor(
        @InjectRepository(Project) private readonly projectRepository: Repository<Project>,
    ) {}
    
    async create() {
        
    }

    async edit() {
    
    }
}