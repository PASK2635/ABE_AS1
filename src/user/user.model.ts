import * as mongoose from "mongoose";
import IUser from "./user.interface";
import { Role } from "./user.roles";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  role: {
    type: Role,
    required: true,
  },
  passwordHash: String,
  refreshToken: String,
});

const User = mongoose.model<IUser & mongoose.Document>("User", userSchema);

export default User;
