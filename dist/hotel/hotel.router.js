"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = require("express");
const hotel_controller_1 = __importDefault(require("./hotel.controller"));
const http_status_codes_1 = require("http-status-codes");
class HotelRouter {
    constructor() {
        this._router = express_1.Router();
        this._controller = hotel_controller_1.default;
        this.configure();
    }
    get router() {
        return this._router;
    }
    configure() {
        this.router.get("/", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const hotels = yield this._controller.getAll();
                res.status(http_status_codes_1.StatusCodes.OK).json(hotels);
            }
            catch (error) {
                next(error);
            }
        }));
        this._router.get("/:hotelName", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const hotel = yield this._controller.getByName(req.params.hotelName);
                res.status(http_status_codes_1.StatusCodes.OK).json(hotel);
            }
            catch (error) {
                next(error);
            }
        }));
        this._router.post("/", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newHotel = req.body;
                const createdHotel = yield this._controller.create(newHotel);
                res.status(http_status_codes_1.StatusCodes.CREATED).json(createdHotel);
            }
            catch (error) {
                next(error);
            }
        }));
        this._router.delete("/:hotelName", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedHotel = yield this._controller.deleteByName(req.params.hotelName);
                res.status(http_status_codes_1.StatusCodes.OK).json(deletedHotel);
            }
            catch (error) {
                next(error);
            }
        }));
    }
}
module.exports = new HotelRouter().router;
//# sourceMappingURL=hotel.router.js.map