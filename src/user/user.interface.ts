import { Role } from './user.roles';

export default interface IUser extends Document {
    role: Role;
    username: string;
    passwordHash: string;
}