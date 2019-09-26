export class ResponseModel{
    public isValid : boolean;
    public data : any;
    public errors : string[];

    public constructor(isValid : boolean, data: any, errors: any){
        this.isValid = isValid;
        this.data = data;
        this.errors = errors;
    }

    public static getValidResponse(data:any){
        return new ResponseModel(true,data,null);
    }

    public static getInValidResponse(error:string){
        return new ResponseModel(false,null,[error]);
    }
}