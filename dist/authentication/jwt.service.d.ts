declare class JwtService {
    generateAccessToken(payload: object): string | undefined;
    generateRefreshToken(payload: object): string;
    verifyAccessToken(accessToken: string): string | object;
    verifyRefreshToken(refreshToken: string): string | object;
    getUserIdFromAuthorizationHeader(authorization: string): any;
}
declare const _default: JwtService;
export = _default;
