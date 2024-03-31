import { Response } from "express";
export declare class ResponseSuccess {
    Response200: <T>(res: Response, data?: T) => void;
    Response201: <T>(res: Response) => void;
    Response204: (res: Response) => void;
    Response202: (res: Response) => void;
    Response203: (res: Response) => void;
    Response205: (res: Response) => void;
    Response206: (res: Response) => void;
}
