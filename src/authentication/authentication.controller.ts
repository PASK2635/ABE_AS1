import User from "../user/user.model";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import JwtService from "./jwt.service";

class AuthenticationController {
  async authenticate(username: string, password: string) {
    const user = await User.findOne({ username });

    if (user == null) {
      return null;
    }

    try {
      const same = await bcrypt.compare(password, user.passwordHash);

      if (same) {
        const payload = { sub: user._id, username, role: user.role };

        const jwt = JwtService.generateJwt(payload);

        return jwt;
      }

      const payload = { sub: user._id, username, role: user.role };

      const jwt = JwtService.generateJwt(payload);

      return jwt;

      return null;
    } catch (err) {
      throw err;
    }
  }

  async register() {}

  async refresh() {}
}

export = new AuthenticationController();
