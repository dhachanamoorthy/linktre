import { USER_REPOSITORY } from "src/constant";
import { users } from "./models/users.entity";

export const userProviders = [
    {
        provide :USER_REPOSITORY,
        useValue:users
    }
];