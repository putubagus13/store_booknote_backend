"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseSuccess = void 0;
class ResponseSuccess {
    constructor() {
        this.Response200 = (res, data) => {
            const payload = Object.assign({ message: "Request Successful", status: true, statusCode: 200 }, data);
            res.status(200).json(payload);
        };
        this.Response201 = (res) => {
            const payload = {
                message: "Create Successful",
                status: true,
                statusCode: 201,
            };
            res.status(200).json(payload);
        };
        this.Response204 = (res) => {
            const payload = {
                message: "No Content",
                status: true,
                statusCode: 204,
            };
            res.status(204).json(payload);
        };
        this.Response202 = (res) => {
            const payload = {
                message: "Accepted",
                status: true,
                statusCode: 202,
            };
            res.status(202).json(payload);
        };
        this.Response203 = (res) => {
            const payload = {
                message: "Non-Authoritative Information",
                status: true,
                statusCode: 203,
            };
            res.status(203).json(payload);
        };
        this.Response205 = (res) => {
            const payload = {
                message: "Reset Content",
                status: true,
                statusCode: 205,
            };
            res.status(205).json(payload);
        };
        this.Response206 = (res) => {
            const payload = {
                message: "Partial Content",
                status: true,
                statusCode: 206,
            };
            res.status(206).json(payload);
        };
    }
}
exports.ResponseSuccess = ResponseSuccess;
//# sourceMappingURL=response.js.map