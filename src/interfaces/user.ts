export interface IUser {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    avatar: string;
    isActive?: boolean;
    avatarRef?: string;
    accessToken?: string;
}
