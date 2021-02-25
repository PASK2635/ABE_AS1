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
const http_status_codes_1 = require("http-status-codes");
const authentication_controller_1 = __importDefault(require("./authentication.controller"));
class AuthenticationRouter {
    constructor() {
        this._router = express_1.Router();
        this._controller = authentication_controller_1.default;
        this.configure();
    }
    get router() {
        return this._router;
    }
    configure() {
        this.router.post("/authenticate", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const result = yield this._controller.authenticate(username, password);
                res.status(http_status_codes_1.StatusCodes.OK).json(result);
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(error);
            }
        }));
        this._router.post("/register", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const result = yield this._controller.register(username, password);
                res.status(http_status_codes_1.StatusCodes.OK).json(result);
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.CONFLICT).json(error);
            }
        }));
        this._router.post("/refresh", (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { authorization } = req.headers;
                const result = yield this._controller.refresh(authorization);
                res.status(http_status_codes_1.StatusCodes.OK).json(result);
            }
            catch (error) {
                res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(error);
            }
        }));
    }
}
module.exports = new AuthenticationRouter().router;
//# sourceMappingURL=authentication.router.js.map