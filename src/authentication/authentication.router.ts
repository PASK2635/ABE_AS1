import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import AuthenticationController from "./authentication.controller";

class HotelRouter {
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

          if (result == null) {
            res
              .status(StatusCodes.UNAUTHORIZED)
              .json("Wrong username or password");
          } else {
            res.status(StatusCodes.OK).json(result);
          }
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.post(
      "/register",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { username, password } = req.body;

          const result = await this._controller.register(username, password);

          if (result == null) {
            // Is this a big no-no?
            res
              .status(StatusCodes.CONFLICT)
              .json("A user with that username already exists");
          } else {
            res.status(StatusCodes.OK).json(result);
          }
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.post(
      "/refresh",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { authorization } = req.headers;

          if (authorization == null) {
            res.status(StatusCodes.UNAUTHORIZED);
          } else {
            const result = await this._controller.refresh(authorization);

            if (result == null) {
              res.status(StatusCodes.UNAUTHORIZED).json();
            } else {
              res.status(StatusCodes.OK).json(result);
            }
          }
        } catch (error) {
          next(error);
        }
      }
    );
  }
}

export = new HotelRouter().router;
