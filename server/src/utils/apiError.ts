class ApiError <T = unknown> extends Error {
    success: boolean;
    message: string;
    data: T | null;
    statusCode: number;
    error:unknown[];

    constructor(
        message = "Internal Server Error",
        statusCode:any,
        error = [],
        stack = ""
    ){
        super(message);
        this.statusCode = statusCode;
        this.error = error;
        this.stack = stack;
        this.data =  null;
        this.message = message;
        this.success = false;
        this.error = error;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;