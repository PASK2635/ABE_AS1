"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtService {
    generateAccessToken(payload) {
        let expires = new Date();
        const expiresInSeconds = expires.getSeconds();
        const tokenLifeInSeconds = Number(process.env.ACCESS_TOKEN_LIFE);
        expires.setSeconds(expiresInSeconds + tokenLifeInSeconds);
        const secret = process.env.ACCESS_TOKEN_SECRET;
        if (secret != undefined) {
            const generatedToken = jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, payload), { exp: expires.getTime() / 1000 }), secret);
            return generatedToken;
        }
    }
    generateRefreshToken(payload) {
        let expires = new Date();
        const expiresInSeconds = expires.getSeconds();
        const tokenLifeInSeconds = Number(process.env.REFRESH_TOKEN_LIFE);
        expires.setSeconds(expiresInSeconds + tokenLifeInSeconds);
        const secret = String(process.env.REFRESH_TOKEN_SECRET);
        const generatedToken = jsonwebtoken_1.default.sign(Object.assign(Object.assign({}, payload), { exp: expires.getTime() / 1000 }), secret);
        return generatedToken;
    }
    verifyAccessToken(accessToken) {
        return jsonwebtoken_1.default.verify(accessToken, String(process.env.ACCESS_TOKEN_SECRET));
    }
    verifyRefreshToken(refreshToken) {
        return jsonwebtoken_1.default.verify(refreshToken, String(process.env.REFRESH_TOKEN_SECRET));
    }
    getUserIdFromAuthorizationHeader(authorization) {
        try {
            const token = authorization.split(" ")[1];
            const payload = jsonwebtoken_1.default.decode(token);
            const id = payload === null || payload === void 0 ? void 0 : payload.sub;
            return id;
        }
        catch (err) {
            return null;
        }
    }
}
module.exports = new JwtService();
//# sourceMappingURL=jwt.service.js.map