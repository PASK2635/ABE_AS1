declare class AuthenticationController {
    authenticate(username: string, password: string): Promise<string | undefined>;
    register(username: string, password: string): Promise<{
        id: any;
        username: string;
    }>;
    refresh(authorizationHeader: string | undefined): Promise<string | undefined>;
}
declare const _default: AuthenticationController;
export = _default;
