import { Min } from "class-validator";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Gender, UserRole } from "../dto/user.dto";
import * as bcrypt from "bcrypt";

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

    @Column({
        nullable: true
    })
    notes: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    async hashPassword(password: string){
        let user = this;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
    }

    async comparePassword(password: string) {
        return await bcrypt.compare(password, this.password);
      }
}