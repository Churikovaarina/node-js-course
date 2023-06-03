import { Express } from "express";
import { usersRouter } from "./users.route.js";

export const initRoutes = (app: Express) => {
    app.use(`/users`, usersRouter);
};