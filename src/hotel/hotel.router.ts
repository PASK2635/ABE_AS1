import { NextFunction, Request, Response, Router } from "express";
import HotelController from "./hotel.controller";
import IHotel from "./hotel.interface";
import { StatusCodes } from "http-status-codes";

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
          const hotels: IHotel[] = await this._controller.getAll();

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
          const hotel = await this._controller.getByName(req.params.hotelName);
          res.status(StatusCodes.OK).json(hotel);
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.post(
      "/",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const newHotel: IHotel = req.body;
          const createdHotel: IHotel = await this._controller.create(newHotel);

          res.status(StatusCodes.CREATED).json(createdHotel);
        } catch (error) {
          next(error);
        }
      }
    );

    this._router.delete(
      "/:hotelName",
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          const deletedHotel = await this._controller.deleteByName(
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
