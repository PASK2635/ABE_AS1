import { NextFunction, Request, Response, Router } from "express";
import HotelController from "./hotel.controller";
import IHotel from "./hotel.interface";
import { StatusCodes } from "http-status-codes";
import AuthorizationService from "../authorization/authorization.service";
import JwtService from "../authentication/jwt.service";

class HotelRouter {
  private _router = Router();
  private _controller = HotelController;

  get router() {
    return this._router;
  }

  constructor() {
    this.configure();
  }

  private configure() {
    this.router.get(
      "/",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const hotels: IHotel[] = await this._controller.getAllAsync();

          res.status(StatusCodes.OK).json(hotels);
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.get(
      "/:hotelName",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const hotel = await this._controller.getByNameAsync(
            req.params.hotelName
          );
          res.status(StatusCodes.OK).json(hotel);
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.post(
      "/",
      AuthorizationService.isManager,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const authorization = req.headers.authorization;
          if (!authorization) {
            throw new Error();
          }

          const createdBy = JwtService.getUserIdFromAuthorizationHeader(
            authorization
          );

          const newHotel: IHotel = { ...req.body, createdBy };
          const createdHotel: IHotel = await this._controller.createAsync(
            newHotel
          );

          res.status(StatusCodes.CREATED).json(createdHotel);
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.delete(
      "/:hotelName",
      AuthorizationService.isManager,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const deletedHotel = await this._controller.deleteByNameAsync(
            req.params.hotelName
          );
          res.status(StatusCodes.OK).json(deletedHotel);
        } catch (error) {
          next(error);
        }
      }
    );
  }
}

export = new HotelRouter().router;
