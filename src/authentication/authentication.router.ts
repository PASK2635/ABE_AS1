import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import AuthenticationController from "./authentication.controller";

class AuthenticationRouter {
  private _router = Router();
  private _controller = AuthenticationController;

  get router() {
    return this._router;
  }

  constructor() {
    this.configure();
  }

  private configure() {
    this.router.post(
      "/authenticate",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { username, password } = req.body;

          const result = await this._controller.authenticate(
            username,
            password
          );

          res.status(StatusCodes.OK).json(result);
        } catch (error) {
          res.status(StatusCodes.UNAUTHORIZED).json(error);
        }
      }
    );

    this._router.post(
      "/register",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { username, password } = req.body;

          const result = await this._controller.register(username, password);

          res.status(StatusCodes.OK).json(result);
        } catch (error) {
          res.status(StatusCodes.CONFLICT).json(error);
        }
      }
    );

    this._router.post(
      "/refresh",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { authorization } = req.headers;

          const result = await this._controller.refresh(authorization);

          res.status(StatusCodes.OK).json(result);
        } catch (error) {
          res.status(StatusCodes.UNAUTHORIZED).json(error);
        }
      }
    );
  }
}

export = new AuthenticationRouter().router;
