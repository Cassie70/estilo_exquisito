import { Router } from 'express';
import { UsuariosController } from '../controllers/usuarios.js';

export const createUsuariosRouter = ({ usuariosModelo }) => {
    const usuariosRouter = Router();
    const usuariosController = new UsuariosController({ usuariosModelo });

    usuariosRouter.get('/', usuariosController.getAll);
    usuariosRouter.get('/:id', usuariosController.getById);
    usuariosRouter.get('/email/:correo_electronico', usuariosController.getByEmail);
    usuariosRouter.post('/', usuariosController.create);
    usuariosRouter.patch('/:id/nombre', usuariosController.updateNombre);
    usuariosRouter.patch('/:id/apellido', usuariosController.updateApellido);
    usuariosRouter.patch('/:id/email', usuariosController.updateEmail);
    usuariosRouter.patch('/:id/telefono', usuariosController.updateTelefono);
    //usuariosRouter.delete('/:id', usuariosController.delete);

    return usuariosRouter;
};
