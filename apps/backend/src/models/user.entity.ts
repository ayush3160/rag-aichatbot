import { Entity , Column, OneToMany } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Project } from "./project.entity";

@Entity({name: 'users'})
export class User extends BaseEntity {
    @Column({type: 'varchar', unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    organisationName: string;

    @OneToMany(() => Project, (project) => project.createdBy)
    projects: Project[];
}