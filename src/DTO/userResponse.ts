export class userResponse{
    public name : string;
    public email : string;
    public mobile : string;
    public profilePic : string;
    public profileStatus : boolean;
    public role : string;
    
    public constructor(user : any){
        this.name = user["name"];
        this.email = user["email"];
        this.mobile = user["mobile"];
        this.profileStatus = user["profileStatus"];
        this.role = user["role"];
    }
}