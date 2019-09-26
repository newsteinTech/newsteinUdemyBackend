export class TokenPayload{
    public _id: string;
    public name: string;
    public role: string

    public constructor(user: any) {
        return {
            "_id" : user._id,
            "name" : user.name,
            "role" : user.role
        }
    }
}