import { Entity , Column } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({name: 'users'})
export class User extends BaseEntity {
    @Column({type: 'varchar', unique: true})
    email: string;

    @Column()
    password: string;

    @Column()
    organisationName: string;
}