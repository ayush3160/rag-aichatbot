import { Module } from '@nestjs/common';
import { Project } from '../models/project.entity';
import { User } from '../models/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, User])],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ 
  ],
})
export class ProjectModule {}
