export default interface IUser extends Document {
    role:Role;
    userName:string;
    passwordHash:string;
}

enum Role{
    User = 'User',
    Guest = 'Guest',
    Manager = 'Manager',
    Admin = 'Admin'
}