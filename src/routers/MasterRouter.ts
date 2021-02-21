import { Router } from 'express';
import authenticationRouter from '../authentication/authentication.router';
import hotelRouter from '../hotel/hotel.router';

class MasterRouter {
    private _router = Router();
    private _authenticationRouter = authenticationRouter;
    private _hotelRouter = hotelRouter;

    get router() {
        return this._router;
    }

    constructor() {
        this._configure();
    }

    private _configure() {
        this._router.use('/', this._authenticationRouter);
        this._router.use('/hotel', this._hotelRouter)
    }
}

export = new MasterRouter().router;