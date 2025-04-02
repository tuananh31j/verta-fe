import { IUser } from '~/interfaces/user';

export type IUserProfileResponse = {
    _id: string;
    name: string;
    email: string;
    role: string;
    phone: string;
    avatar: string;
    userIsOldWhen: string;
};

export type IUserResponse = {
    users: IUser[];
    page: number;
    totalDocs: number;
    totalPages: number;
};

export type IUsers = {
    _id: string;
    avatar: string;
    name: string;
    email: string;
    phone?: string;
    isBanned: boolean;
    bannedAt: string;
    bannedReason: string;
};
export type IUserTimeLine = {
    action: string;
    adminEmail: string;
    adminId: string;
    adminName: string;
    reason: string;
    timestamp: string;
    _id: string;
};
