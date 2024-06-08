export class SchemaTrabajador {
    static validarCreateTrabajador({ usuario, rol, password, nombre_completo, correo_electronico }) {
        if (!usuario || !rol || !password) {
            return { success: false, error: 'Usuario, rol y contraseña son obligatorios' };
        }

        if (typeof usuario !== 'string' || typeof rol !== 'string' || typeof password !== 'string') {
            return { success: false, error: 'Usuario, rol y contraseña deben ser cadenas de texto' };
        }

        const rolesValidos = ["gerente", "vendedor", "almacenista"];
        if (!rolesValidos.includes(rol)) {
            return { success: false, error: 'Rol inválido' };
        }

        if (correo_electronico && typeof correo_electronico !== 'string') {
            return { success: false, error: 'Correo electrónico debe ser una cadena de texto' };
        }

        if (nombre_completo && typeof nombre_completo !== 'string') {
            return { success: false, error: 'Nombre completo debe ser una cadena de texto' };
        }

        return { success: true };
    }

    static validarUpdateUsuario({ usuario }) {
        if (!usuario || typeof usuario !== 'string') {
            return { success: false, error: 'Usuario es obligatorio y debe ser una cadena de texto' };
        }

        return { success: true };
    }

    static validarUpdateRol({ rol }) {
        const rolesValidos = ["gerente", "vendedor", "almacenista"];
        if (!rol || !rolesValidos.includes(rol)) {
            return { success: false, error: 'Rol inválido' };
        }

        return { success: true };
    }

    static validarUpdatePassword({ password }) {
        if (!password || typeof password !== 'string') {
            return { success: false, error: 'Contraseña es obligatoria y debe ser una cadena de texto' };
        }

        return { success: true };
    }

    static validarUpdateNombreCompleto({ nombre_completo }) {
        if (!nombre_completo || typeof nombre_completo !== 'string') {
            return { success: false, error: 'Nombre completo es obligatorio y debe ser una cadena de texto' };
        }

        return { success: true };
    }

    static validarUpdateEmail({ correo_electronico }) {
        if (!correo_electronico || typeof correo_electronico !== 'string') {
            return { success: false, error: 'Correo electrónico es obligatorio y debe ser una cadena de texto' };
        }

        return { success: true };
    }
}
