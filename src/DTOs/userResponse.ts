export class UserResponse {
    public name : string;
    public email : string;
    public mobile : string;
    public profilePic : string;
    public isProfileComplete : boolean;

    public constructor(user: any) {
        this.name = user.name;
        this.email = user.email;
        this.mobile = user.mobile;
        this.profilePic = user.profilePic;
        this.isProfileComplete = user.isProfileComplete;
    }
}