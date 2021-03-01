import User from "./user.model";
import { Role } from "./user.roles";
import { Doc, group, param, put, response, route } from "doctopus";

@group("User")
export class UserController {
  @put
  @route("/api/user/role")
  @param({
    in: "body",
    name: "User role",
    schema: Doc.object({
      example: {
        username: "username",
        role: "role",
      },
    })
  })
  @response({
    description: "PUT - change role",
    schema: Doc.string({
      example: {
        message: "User has been updated to a new role",
      },
    })
  })
  async updateUserRoleByName(username: string, role: Role) {
    return User.updateOne({ username }, { role });
  }
}

export default new UserController();
