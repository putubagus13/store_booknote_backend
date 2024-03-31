export declare class LoginDto {
    email: string;
    password: string;
    constructor(email: string, password: string);
}
export declare class RegisterDto {
    fullname: string;
    email: string;
    password: string;
    storeName: string;
    constructor(email: string, password: string, fullname: string);
}
export declare class GetUserProfile {
    token: string;
    constructor(token: string);
}
