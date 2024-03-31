import { Response } from "express";

export class ResponseSuccess {
  public Response200 = <T>(res: Response, data?: T) => {
    const payload = {
      message: "Request Successful",
      status: true,
      statusCode: 200,
      ...data,
    };
    res.status(200).json(payload);
  };

  public Response201 = <T>(res: Response) => {
    const payload = {
      message: "Create Successful",
      status: true,
      statusCode: 201,
    };
    res.status(200).json(payload);
  };

  public Response204 = (res: Response) => {
    const payload = {
      message: "No Content",
      status: true,
      statusCode: 204,
    };
    res.status(204).json(payload);
  };

  public Response202 = (res: Response) => {
    const payload = {
      message: "Accepted",
      status: true,
      statusCode: 202,
    };
    res.status(202).json(payload);
  };

  public Response203 = (res: Response) => {
    const payload = {
      message: "Non-Authoritative Information",
      status: true,
      statusCode: 203,
    };
    res.status(203).json(payload);
  };

  public Response205 = (res: Response) => {
    const payload = {
      message: "Reset Content",
      status: true,
      statusCode: 205,
    };
    res.status(205).json(payload);
  };

  public Response206 = (res: Response) => {
    const payload = {
      message: "Partial Content",
      status: true,
      statusCode: 206,
    };
    res.status(206).json(payload);
  };
}
