import { BaseRepository } from "./base.repository.js";
import { UserEntity } from "../enities";

class UsersRepository extends BaseRepository<UserEntity> {
    constructor() {
        super(`users`);
    }
}

export const usersRepository = new UsersRepository();