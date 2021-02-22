import IUser from "../user/user.interface";
import User from "../user/user.model";
import bcrypt from "bcrypt";
import JwtService from "./jwt.service";
import { Role } from "../user/user.roles";

class AuthenticationController {
  async authenticate(username: string, password: string) {
    const user = await User.findOne({ username });

    if (user == null) {
      // TODO: Should return an error object with a message
      return null;
    }

    try {
      const same = await bcrypt.compare(password, user.passwordHash);

      if (same) {
        const payload = { sub: user._id, username, role: user.role };

        const accessToken = JwtService.generateAccessToken(payload);

        const refreshToken = JwtService.generateRefreshToken(payload);

        await User.updateOne({ username }, { refreshToken });

        return accessToken;
      }

      // TODO: Should return an error object with a message
      return null;
    } catch (err) {
      throw err;
    }
  }

  async register(username: string, password: string) {
    const userExists = await User.findOne({ username });

    if (userExists != null) {
      // TODO: Should return an error object with a message
      return null;
    }

    try {
      const passwordHash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_SALT_ROUNDS)
      );

      const newUser = { role: Role.User, username, passwordHash };

      const createdUser = await User.create(newUser);

      return { id: createdUser._id, username: createdUser.username };
    } catch (err) {
      throw err;
    }
  }

  async refresh(authorizationHeader: string) {
    const userId = JwtService.getUserIdFromAuthorizationHeader(
      authorizationHeader
    );

    if (userId == null) {
      // TODO: Should return an error object with a message
      return null;
    }

    const user = await User.findOne({ _id: userId });

    if (user == null || user.refreshToken == null) {
      // TODO: Should return an error object with a message
      return null;
    }

    const result = JwtService.verifyRefreshToken(user.refreshToken);

    if (result == null) {
      return null;
    }

    const payload = { sub: user._id, username: user.username, role: user.role };

    const accessToken = JwtService.generateAccessToken(payload);

    const refreshToken = JwtService.generateRefreshToken(payload);

    await User.updateOne({ username: user.username }, { refreshToken });

    return accessToken;
  }
}

export = new AuthenticationController();
