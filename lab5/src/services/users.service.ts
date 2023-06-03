import { usersRepository } from "../repositories";
import { CreateUserDto, UpdateUserDto } from "../enities";

class UsersService {
    getAllUsers() {
        return usersRepository.getAll();
    };

    getUserById(id: string) {
        return usersRepository.search(user => user.id === id);
    };

    insertOne(body: CreateUserDto) {
        return usersRepository.insertOne(body);
    };

    updateOne(id: string, body: UpdateUserDto) {
        return usersRepository.updateOne(id, body);
    }

    removeUser(id: string) {
        return usersRepository.removeOne(id);
    }
}

export const usersService = new UsersService();