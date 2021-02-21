import jwt from "jsonwebtoken";

class JwtService {
  async generateJwt(payload: object) {
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
}

export = new JwtService();
