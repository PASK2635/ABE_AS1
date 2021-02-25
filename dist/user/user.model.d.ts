import * as mongoose from "mongoose";
import IUser from "./user.interface";
declare const User: mongoose.Model<IUser & mongoose.Document<any>>;
export default User;
