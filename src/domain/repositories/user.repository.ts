import { User } from "../entities/user.entity";

export interface UserRepository{
    findByEmail(email : string) : Promise<User>
    save(user : User) : Promise<User>
}