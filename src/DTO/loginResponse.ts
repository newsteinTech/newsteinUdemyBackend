import { userResponse } from "./userResponse";

export class loginResponse{
    public token : string;
    public user : userResponse;

    public constructor(token : string, user: userResponse){
        this.token = token;
        this.user = user;
    }
}