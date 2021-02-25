import { NextFunction, Request, Response } from "express";
declare class AuthenticationService {
    validatePasswordAsync(password: string, passwordHash: string): Promise<boolean>;
    hashPasswordAsync(password: string): Promise<string>;
    verify(req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> | undefined;
}
declare const _default: AuthenticationService;
export = _default;
