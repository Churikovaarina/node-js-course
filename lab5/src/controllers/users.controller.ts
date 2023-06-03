import { Request, Response } from "express";
import { usersService } from "../services";
import { CreateUserDto, UpdateUserDto } from "../enities";

class UsersController {
    getAllUsers(req: Request, res: Response) {
        const data = usersService.getAllUsers();
        return res.send(data);
    };

    getUser(req: Request<{
        id: string;
    }>, res: Response) {
        const { id } = req.params;
        const data = usersService.getUserById(id);
        return res.send(data);
    }

    insertUser(req: Request<{}, {}, CreateUserDto>, res: Response) {
        const { body } = req;
        const data = usersService.insertOne(body);
        return res.send(data);
    }

    updateUser(req: Request<{id: string}, {}, UpdateUserDto>, res: Response) {
        const { body, params: { id } } = req;
        const data = usersService.updateOne(id, body);
        return res.send(data);
    }

    removeUser(req: Request<{id: string}>, res: Response) {
        const { id } = req.params;
        const data = usersService.removeUser(id);
        return res.send(data);
    }
}

export const usersController = new UsersController();