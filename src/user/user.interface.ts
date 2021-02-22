import { Role } from "./user.roles";

export default interface IUser extends Document {
  role: Role;
  username: string;
  passwordHash: string;
  // Optional - refreshToken is not set on register, so it must be optional
  refreshToken?: string;
}
