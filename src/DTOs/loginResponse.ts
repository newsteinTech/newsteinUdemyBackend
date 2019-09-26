import { UserResponse } from './userResponse';

export class LoginResponse {
    public token: string;
    public user: UserResponse;

    public constructor(token: string, user: UserResponse) {
        this.token = token;
        this.user = user;
    }
}