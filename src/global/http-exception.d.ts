export declare class HttpException extends Error {
    statusCode: number;
    constructor(statusCode: number, message: string);
}
