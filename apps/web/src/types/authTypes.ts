export type RegisterUserBody = {
    organisationName: string;
    email: string;
    password: string;
}

export type RegisterUserResponse = {
    message: string;
    token: string;
}

export type LoginUserBody = {
    email: string;
    password: string;
}