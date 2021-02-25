"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const authentication_router_1 = __importDefault(require("../authentication/authentication.router"));
const hotel_router_1 = __importDefault(require("../hotel/hotel.router"));
const authentication_service_1 = __importDefault(require("../authentication/authentication.service"));
class MasterRouter {
    constructor() {
        this._router = express_1.Router();
        this._authenticationRouter = authentication_router_1.default;
        this._hotelRouter = hotel_router_1.default;
        this._configure();
    }
    get router() {
        return this._router;
    }
    _configure() {
        this._router.use("/", this._authenticationRouter);
        this._router.use("/hotel", authentication_service_1.default.verify, this._hotelRouter);
    }
}
module.exports = new MasterRouter().router;
//# sourceMappingURL=MasterRouter.js.map