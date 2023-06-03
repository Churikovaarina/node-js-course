import { Router } from "express";
import { usersController } from "../controllers";

const router = Router();

router.get(`/`, usersController.getAllUsers);

router.get(`/:id`, usersController.getUser);

router.post(`/`, usersController.insertUser);

router.put(`/:id`, usersController.updateUser);

router.delete(`/:id`, usersController.removeUser);

export { router as usersRouter };