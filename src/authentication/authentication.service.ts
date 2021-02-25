import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import JwtService from "./jwt.service";

class AuthenticationService {
  async validatePasswordAsync(
    password: string,
    passwordHash: string
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }

  async hashPasswordAsync(password: string): Promise<string> {
    return bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));
  }

  verify(req: Request, res: Response, next: NextFunction) {
    let accessToken = req.headers.authorization;

    if (!accessToken) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    accessToken = accessToken.replace("Bearer ", "");

    try {
      // Throws an error if the access token is can't be verified
      JwtService.verifyAccessToken(accessToken);

      next();
    } catch (e) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }
  }
}

export = new AuthenticationService();
