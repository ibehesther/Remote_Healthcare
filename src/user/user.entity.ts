import { Min } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Gender } from '../enum/gender.enum'
import { Role } from "../enum/role.enum"


@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    @Min(1)
    first_name: string

    @Column({
        nullable: true
    })
    middle_name: string

    @Column()
    @Min(1)
    last_name: string

    @Column({
        unique: true
    })
    email: string

    @Column({})
    password: string

    @Column()
    dob: Date

    @Column({
        type: "enum",
        enum: Gender
    })
    gender: Gender

    @Column()
    phone_number: string

    @Column()
    address: string

    @Column({
        type: "enum",
        enum: Role,
        default: Role.PATIENT
    })
    role: Role

    @Column({
        nullable: true
    })
    notes: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

}