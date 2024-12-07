import { Entity , Column , ManyToOne} from "typeorm";
import { BaseEntity } from "./base.entity";
import { User } from "./user.entity";

@Entity({name: 'projects'})
export class Project extends BaseEntity {
    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    website: string;

    @ManyToOne(() => User, (user) => user.projects)
    createdBy: User;
}