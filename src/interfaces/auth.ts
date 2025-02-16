export interface IRegisterPayload {
    name: string;
    email: string;
    phone: string;
    password: string;
}
export interface ILoginPayload {
    email: string;
    password: string;
}
export interface ILoginResponse {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    avatar: string;
    accessToken: string;
}
