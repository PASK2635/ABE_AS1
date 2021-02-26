import { NextFunction, Request, Response, Router } from "express";
import RoomController from "./room.controller";
import IRoom from "./room.interface";
import UserController from "../user/user.controller";
import {Role} from "../user/user.roles";
import HotelController from "../hotel/hotel.controller";
import { StatusCodes } from "http-status-codes";
import AuthorizationService from "../authorization/authorization.service";
import JwtService from "../authentication/jwt.service";
import authenticationService from "../authentication/authentication.service";

class RoomRouter {
    private _router = Router();
    private _controller = RoomController;
    private _userController = UserController;
    private _hotelController = HotelController;

    get router(){
        return this._router;
    }

    constructor(){
        this.configure();
    }

    private configure(){
        this.router.get(
            "/",
            async (req: Request, res: Response, next: NextFunction) => {
                try{
                    const rooms: IRoom[] = await this._controller.getAllAsync();
                    res.status(StatusCodes.OK).json(rooms);
                }
                catch(error){{
                    next(error);
                }}
            }
        );

        this.router.get(
            "/:roomNumber",
            async(req: Request, res: Response, next: NextFunction) => {
                try{
                    const room = await this._controller.getByNumberAsync(Number(req.params.roomNumber));
                    res.status(StatusCodes.OK).json(room);
                }
                catch(error){
                    next(error);
                }
            }
        );

        this.router.post(
            "/",
            AuthorizationService.isManager,
            async (req: Request, res: Response, next: NextFunction) => {
                try{
                    const auth = req.headers.authorization;
                    if (!auth) {
                      throw new Error();
                    }

                    const newRoom: IRoom = {...req.body};

                    const hotelId = newRoom.hotelId;
                    if(hotelId == undefined){
                        throw new Error();
                    }
                    const managerId = (await this._hotelController.getByNameAsync(hotelId))?.createdBy;

                    const userID = JwtService.getUserIdFromAuthorizationHeader(auth);
                    if(!userID || userID != managerId){
                        throw new Error();
                    }

                    const createdRoom = await this._controller.createAsync(newRoom);
                    res.status(StatusCodes.CREATED).json(createdRoom);
                }
                catch(error){
                    next(error);
                }
            }
        )

        this.router.put(
            "/:roomNumber/reserve",
            async (req: Request, res: Response, next: NextFunction) => {
                try{
                    await this._controller.reserveRoomByNumber(Number(req.params.roomNumber));

                    const auth = req.headers.authorization;
                    if(!auth){
                        throw new Error();
                    }
                    const userID = JwtService.getUserIdFromAuthorizationHeader(auth);
                    this._userController.updateUserRoleById(userID,Role.Guest);
                    res.status(StatusCodes.OK);
                }
                catch(error){
                    next (error);
                }
            }
        );

        this.router.delete(
            "/:roomNumber",
            AuthorizationService.isManager,
            async (req: Request, res: Response, next: NextFunction)=> {
                try{
                    const hotelId = (await this._controller.getByNumberAsync(Number(req.params.roomNumber)))?.hotelId;
                    if(hotelId == undefined){
                        throw new Error();
                    }
                    const managerId = (await this._hotelController.getByNameAsync(hotelId))?.createdBy;
                    
                    const auth = req.headers.authorization;
                    if(!auth){
                        throw new Error();
                    }
                    const userID = JwtService.getUserIdFromAuthorizationHeader(auth);
                    if(!userID || userID != managerId){
                        throw new Error();
                    }

                    const deletedRoom = this._controller.deleteByNumberAsync(Number(req.params.roomNumber));
                    res.status(StatusCodes.OK).json(deletedRoom);

                }
                catch(error){
                    next(error);
                }
            }
        );
    }
}

export = new RoomRouter().router;