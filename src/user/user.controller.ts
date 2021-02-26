import User from "./user.model";
import { Role } from "./user.roles";

class UserController {
  async updateUserRole(username: string, role: Role) {
    return User.updateOne({ username }, { role });
  }

  async updateUserRoleById(userId:string, role:Role){
    return User.updateOne({__id:userId}, {role:role});
  }
}

export = new UserController();
