class ApiResponse<T = unknown> {
    success: boolean;
    message: string;
    data: T | null;
    statusCode: number;

    constructor(
        statusCode: number,
        message: string = "success",
        data: T | null = null
    ) {
        this.success = statusCode >= 200 && statusCode < 300;
        this.message = message;
        this.data = data;
        this.statusCode = statusCode;
    }
}

export default ApiResponse;