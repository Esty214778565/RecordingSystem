export type User = {
    id?: number;
    name: string;
    email?: string;
    password: string;
    role:string;
}
export type UserLogin = {
    name: string;
    password: string;
}