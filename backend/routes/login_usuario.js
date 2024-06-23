import { Router } from "express";
import { LoginUsuarioController } from "../controllers/login_usuario.js";

export const createLoginUsuarioRouter = () => {
    const loginUsuarioRouter = Router();

    const loginUsuarioController = new LoginUsuarioController();

    //loginUsuarioRouter.get('/', );

    return loginUsuarioRouter;
}