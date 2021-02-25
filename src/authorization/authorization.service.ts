import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import JwtService from "../authentication/jwt.service";
import { Role } from "../user/user.roles";

class AuthorizationService {
  isAdmin(req: Request, res: Response, next: NextFunction) {
    if (!AuthorizationService.isRole(Role.Admin, req, res)) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    next();
  }

  isManager(req: Request, res: Response, next: NextFunction) {
    if (!AuthorizationService.isRole(Role.Manager, req, res)) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    next();
  }

  isGuest(req: Request, res: Response, next: NextFunction) {
    if (!AuthorizationService.isRole(Role.Guest, req, res)) {
      return res.status(StatusCodes.UNAUTHORIZED).send();
    }

    next();
  }

  static isRole(role: Role, req: Request, res: Response): boolean {
    let accessToken = req.headers.authorization;

    if (!accessToken) {
      res.status(StatusCodes.UNAUTHORIZED).send();
      return false;
    }

    accessToken = accessToken.replace("Bearer ", "");

    const payload = JwtService.decode(accessToken);

    return payload.role == role.toString();
  }
}

export = new AuthorizationService();
