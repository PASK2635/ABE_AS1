import * as mongoose from "mongoose";
import IUser from "./user.interface";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  refreshToken: String,
});

const User = mongoose.model<IUser & mongoose.Document>("User", userSchema);

export default User;
