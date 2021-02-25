import AuthenticationService from "../authentication/authentication.service";
import User from "../user/user.model";
import { Role } from "../user/user.roles";

export default async function seedAdminUser() {
  const user = await User.findOne({
    username: String(process.env.ADMIN_USERNAME),
  });

  if (user != null) {
    return;
  }

  const newUser = {
    role: Role.Admin,
    username: process.env.ADMIN_USERNAME,
    passwordHash: await AuthenticationService.hashPasswordAsync(
      String(process.env.ADMIN_PASSWORD)
    ),
  };

  await User.create(newUser);
}
