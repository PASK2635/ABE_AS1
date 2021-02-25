import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import AuthorizationService from "../authorization/authorization.service";
import UserController from "./user.controller";

class UserRouter {
  private _router = Router();
  private _controller = UserController;

  get router() {
    return this._router;
  }

  constructor() {
    this.configure();
  }

  private configure() {
    this.router.put(
      "/",
      AuthorizationService.isAdmin,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const { username, role } = req.body;

          this._controller.updateUserRole(username, role);

          res
            .status(StatusCodes.OK)
            .json(`${username} updated to have role: ${role}`);
        } catch (error) {
          next(error);
        }
      }
    );
  }
}

export = new UserRouter().router;
