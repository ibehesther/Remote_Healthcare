import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

enum Gender {
    MALE="male",
    FEMALE="female"
}

enum UserRole {
    PATIENT= "patient",
    PROVIDER="provider",
    ADMIN="admin",
    SUPER_ADMIN="super admin"
}

@Entity()
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    first_name: string

    @Column()
    middle_name: string

    @Column()
    last_name: string

    @Column()
    email: string

    @Column()
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
        enum: UserRole,
        default: UserRole.PATIENT
    })
    role: UserRole

    @Column()
    notes: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date
}