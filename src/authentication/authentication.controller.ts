import User from "../user/user.model";
import JwtService from "./jwt.service";
import AuthenticationService from "./authentication.service";
import { Role } from "../user/user.roles";

class AuthenticationController {
  async authenticate(username: string, password: string) {
    const user = await User.findOne({ username });

    if (user == null) {
      throw new Error("Invalid username or password");
    }

    const valid = await AuthenticationService.validatePasswordAsync(
      password,
      user.passwordHash
    );

    if (!valid) {
      throw new Error("Invalid username or password");
    }

    const payload = { sub: user._id, username, role: user.role };

    const accessToken = JwtService.generateAccessToken(payload);

    const refreshToken = JwtService.generateRefreshToken(payload);

    await User.updateOne({ username }, { refreshToken });

    return accessToken;
  }

  async register(username: string, password: string) {
    const userExists = await User.findOne({ username });

    if (userExists != null) {
      throw new Error("A user with that username already exists");
    }

    const passwordHash = await AuthenticationService.hashPasswordAsync(
      password
    );

    const newUser = { role: Role.User, username, passwordHash };

    const createdUser = await User.create(newUser);

    return { id: createdUser._id, username: createdUser.username };
  }

  async refresh(authorizationHeader: string | undefined) {
    if (authorizationHeader == undefined) {
      throw new Error("Invalid user data");
    }

    const userId = JwtService.getUserIdFromAuthorizationHeader(
      authorizationHeader
    );

    if (userId == null) {
      throw new Error("Invalid user data");
    }

    const user = await User.findOne({ _id: userId });

    if (user == null || user.refreshToken == null) {
      throw new Error("Invalid user data");
    }

    const result = JwtService.verifyRefreshToken(user.refreshToken);

    if (result == null) {
      throw new Error("Invalid user data");
    }

    const payload = { sub: user._id, username: user.username, role: user.role };

    const accessToken = JwtService.generateAccessToken(payload);

    const refreshToken = JwtService.generateRefreshToken(payload);

    await User.updateOne({ username: user.username }, { refreshToken });

    return accessToken;
  }
}

export = new AuthenticationController();
