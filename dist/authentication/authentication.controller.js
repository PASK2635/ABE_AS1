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
const user_model_1 = __importDefault(require("../user/user.model"));
const jwt_service_1 = __importDefault(require("./jwt.service"));
const authentication_service_1 = __importDefault(require("./authentication.service"));
const user_roles_1 = require("../user/user.roles");
class AuthenticationController {
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_model_1.default.findOne({ username });
            if (user == null) {
                throw new Error("Invalid username or password");
            }
            const valid = yield authentication_service_1.default.validatePasswordAsync(password, user.passwordHash);
            if (!valid) {
                throw new Error("Invalid username or password");
            }
            const payload = { sub: user._id, username, role: user.role };
            const accessToken = jwt_service_1.default.generateAccessToken(payload);
            const refreshToken = jwt_service_1.default.generateRefreshToken(payload);
            yield user_model_1.default.updateOne({ username }, { refreshToken });
            return accessToken;
        });
    }
    register(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const userExists = yield user_model_1.default.findOne({ username });
            if (userExists != null) {
                throw new Error("A user with that username already exists");
            }
            const passwordHash = yield authentication_service_1.default.hashPasswordAsync(password);
            const newUser = { role: user_roles_1.Role.User, username, passwordHash };
            const createdUser = yield user_model_1.default.create(newUser);
            return { id: createdUser._id, username: createdUser.username };
        });
    }
    refresh(authorizationHeader) {
        return __awaiter(this, void 0, void 0, function* () {
            if (authorizationHeader == undefined) {
                throw new Error("Invalid user data");
            }
            const userId = jwt_service_1.default.getUserIdFromAuthorizationHeader(authorizationHeader);
            if (userId == null) {
                throw new Error("Invalid user data");
            }
            const user = yield user_model_1.default.findOne({ _id: userId });
            if (user == null || user.refreshToken == null) {
                throw new Error("Invalid user data");
            }
            const result = jwt_service_1.default.verifyRefreshToken(user.refreshToken);
            if (result == null) {
                throw new Error("Invalid user data");
            }
            const payload = { sub: user._id, username: user.username, role: user.role };
            const accessToken = jwt_service_1.default.generateAccessToken(payload);
            const refreshToken = jwt_service_1.default.generateRefreshToken(payload);
            yield user_model_1.default.updateOne({ username: user.username }, { refreshToken });
            return accessToken;
        });
    }
}
module.exports = new AuthenticationController();
//# sourceMappingURL=authentication.controller.js.map