export class ResponseModel{
    public isValid : boolean;
    public data : any;
    public errors : any;

    public constructor(isValid : boolean, data: any, errors: any){
        this.isValid = isValid;
        this.data = data;
        this.errors = errors;
    }

    public static getValidResponse(data:any){
        return new ResponseModel(true,data,null);
    }

    public static getInValidResponse(errors:any){
        return new ResponseModel(false,null,errors);
    }
}