import express from 'express';
import cors from "cors";
import { initRoutes } from "./routes/routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initRoutes(app);

app.get(`/`, (req, res) => res.send(`Hello, world`));

app.listen(3000, () => console.log(`Server started on 3000 port...`));