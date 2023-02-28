export enum Gender {
    MALE="male",
    FEMALE="female"
}

export enum UserRole {
    PATIENT= "patient",
    PROVIDER="provider",
    ADMIN="admin",
    SUPER_ADMIN="super admin"
}


export interface CreateUserDTO {
    first_name: string,
    middle_name?: string,
    last_name: string,
    email: string,
    password: string,
    dob: Date,
    gender: Gender,
    phone_number: string,
    address: string,
    role: UserRole,
    notes: string
}

export interface UpdateUserDTO {
    first_name?: string,
    middle_name?: string,
    last_name?: string,
    email?: string,
    dob?: Date,
    gender?: Gender,
    phone_number?: string,
    address?: string,
    role?: UserRole,
    notes?: string
}