import jwt from "jsonwebtoken";

class JwtService {
  generateAccessToken(payload: object) {
    let expires = new Date();
    const expiresInSeconds = expires.getSeconds();
    const tokenLifeInSeconds = Number(process.env.ACCESS_TOKEN_LIFE);
    expires.setSeconds(expiresInSeconds + tokenLifeInSeconds);

    const secret = process.env.ACCESS_TOKEN_SECRET;

    if (secret != undefined) {
      const generatedToken = jwt.sign(
        {
          ...payload,
          exp: expires.getTime() / 1000,
        },
        secret
      );

      return generatedToken;
    }
  }

  generateRefreshToken(payload: object) {
    let expires = new Date();
    const expiresInSeconds = expires.getSeconds();
    const tokenLifeInSeconds = Number(process.env.REFRESH_TOKEN_LIFE);
    expires.setSeconds(expiresInSeconds + tokenLifeInSeconds);

    const secret = String(process.env.REFRESH_TOKEN_SECRET);

    const generatedToken = jwt.sign(
      {
        ...payload,
        exp: expires.getTime() / 1000,
      },
      secret
    );

    return generatedToken;
  }

  verifyAccessToken(accessToken: string) {
    try {
      return jwt.verify(accessToken, String(process.env.ACCESS_TOKEN_SECRET));
    } catch (_) {
      return null;
    }
  }

  verifyRefreshToken(refreshToken: string) {
    try {
      const result = jwt.verify(
        refreshToken,
        String(process.env.REFRESH_TOKEN_SECRET)
      );
      console.log(result);
      return result;
    } catch (err) {
      return null;
    }
  }

  getUserIdFromAuthorizationHeader(authorization: string) {
    try {
      const token = authorization.split(" ")[1];

      const payload = jwt.decode(token);

      const id = payload?.sub;

      return id;
    } catch (err) {
      return null;
    }
  }
}

export = new JwtService();
