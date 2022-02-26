import { ErrorCodes } from "../task.data/enums/error.codes.enum";

export class Result<T>{

    constructor() {
        this.Errors = [];
    }
    Data?:T;
    StatusCode:number;
    Errors:{}[];
    hasError: boolean;
    /**
     * automatically set response status to 500
     * 
     */
    public addError(errorName:ErrorCodes, errorMsg: string):Result<T> {
        this.Errors.push({errorName,errorMsg});
        this.StatusCode = 500;
        this.hasError = true;
        return this;
    }


    /** 
    * @param StatusCode  200 for Ok or 201 for Created
    */
    public setData(data: T,statusCode:number):Result<T>{
        this.Data = data;
        this.StatusCode = statusCode;
        this.hasError = false;
        return this;
    }
}