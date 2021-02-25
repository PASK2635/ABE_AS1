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
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_codes_1 = require("http-status-codes");
const jwt_service_1 = __importDefault(require("./jwt.service"));
class AuthenticationService {
    validatePasswordAsync(password, passwordHash) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt_1.default.compare(password, passwordHash);
        });
    }
    hashPasswordAsync(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt_1.default.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));
        });
    }
    verify(req, res, next) {
        let accessToken = req.headers.authorization;
        if (!accessToken) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send();
        }
        try {
            // Throws an error if the access token is can't be verified
            jwt_service_1.default.verifyAccessToken(accessToken);
            next();
        }
        catch (e) {
            return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).send();
        }
    }
}
module.exports = new AuthenticationService();
//# sourceMappingURL=authentication.service.js.map