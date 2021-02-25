import { Router } from "express";
import authenticationRouter from "../authentication/authentication.router";
import hotelRouter from "../hotel/hotel.router";
import AuthenticationService from "../authentication/authentication.service";
import userRouter from "../user/user.router";

class MasterRouter {
  private _router = Router();
  private _authenticationRouter = authenticationRouter;
  private _hotelRouter = hotelRouter;
  private _usersRouter = userRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  private _configure() {
    this._router.use("/", this._authenticationRouter);
    this._router.use("/hotel", AuthenticationService.verify, this._hotelRouter);
    this._router.use("/user", AuthenticationService.verify, this._usersRouter);
  }
}

export = new MasterRouter().router;
