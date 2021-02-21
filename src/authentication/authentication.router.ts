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

          const jwt = await this._controller.authenticate(username, password);

          if (jwt == null) {
            res
              .status(StatusCodes.UNAUTHORIZED)
              .json("Wrong username or password");
          } else {
            res.status(StatusCodes.OK).json(jwt);
          }
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.get(
      "/register",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          await this._controller.register();

          // TODO: Should return user email
          res.status(StatusCodes.OK).json();
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.get(
      "/refresh",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          await this._controller.refresh();

          // TODO: Should return new token
          res.status(StatusCodes.OK).json();
        } catch (error) {
          next(error);
        }
      }
    );
  }
}

export = new HotelRouter().router;
