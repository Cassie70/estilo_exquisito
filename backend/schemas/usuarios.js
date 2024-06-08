export class SchemaUsuarios {
    static validarCrearUsuario({ nombre, apellido, correo_electronico, telefono }) {
        if (!nombre || !apellido || !correo_electronico || !telefono) {
            return { success: false, error: 'Nombre, apellido, correo electrónico y teléfono son obligatorios' };
        }

        if (typeof nombre !== 'string' || typeof apellido !== 'string' ||
            typeof correo_electronico !== 'string' || typeof telefono !== 'string') {
            return { success: false, error: 'Nombre, apellido, correo electrónico y teléfono deben ser cadenas de texto' };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(correo_electronico)) {
            return { success: false, error: 'Correo electrónico inválido' };
        }

        const telefonoRegex = /^\d{10}$/;
        if (!telefonoRegex.test(telefono)) {
            return { success: false, error: 'Teléfono inválido' };
        }

        return { success: true };
    }

    static validarNombre({ nombre }) {
        if (!nombre || typeof nombre !== 'string') {
            return { success: false, error: 'Nombre inválido' };
        }
        return { success: true };
    }

    static validarApellido({ apellido }) {
        if (!apellido || typeof apellido !== 'string') {
            return { success: false, error: 'Apellido inválido' };
        }
        return { success: true };
    }

    static validarCorreo({ correo_electronico }) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!correo_electronico || typeof correo_electronico !== 'string' || !emailRegex.test(correo_electronico)) {
            return { success: false, error: 'Correo electrónico inválido' };
        }
        return { success: true };
    }

    static validarTelefono({ telefono }) {
        const telefonoRegex = /^\d{10}$/;
        if (!telefono || typeof telefono !== 'string' || !telefonoRegex.test(telefono)) {
            return { success: false, error: 'Teléfono inválido' };
        }
        return { success: true };
    }
}
