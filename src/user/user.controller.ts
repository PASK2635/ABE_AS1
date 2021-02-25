import User from "./user.model";
import { Role } from "./user.roles";

class UserController {
  async updateUserRole(username: string, role: Role) {
    return User.updateOne({ username }, { role });
  }
}

export = new UserController();
