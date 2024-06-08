export class SchemaProducto {
    static validarCreateProducto(producto) {
        const { nombre, descripcion, precio, imagen_url } = producto;

        if (!nombre || !descripcion || !precio || !imagen_url) {
            return { success: false, error: 'Faltan campos por llenar' };
        }

        if (typeof nombre !== 'string' || typeof descripcion !== 'string' || typeof imagen_url !== 'string') {
            return { success: false, error: 'Los campos nombre, descripcion e imagen_url deben ser de tipo string' };
        }

        if (typeof precio !== 'number') {
            return { success: false, error: 'El campo precio debe ser de tipo number' };
        }

        if (precio <= 0) {
            return { success: false, error: 'El precio debe ser mayor a 0' };
        }

        // Validar que la imagen sea una URL
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        if (!urlPattern.test(imagen_url)) {
            return { success: false, error: 'La imagen_url no es una URL válida' };
        }

        return { success: true };
    }

    static validarUpdateProducto(producto) {
        const { nombre, descripcion, precio, imagen_url } = producto;

        if (nombre && typeof nombre !== 'string') {
            return { success: false, error: 'El campo nombre debe ser una cadena de texto válida' };
        }

        if (descripcion && typeof descripcion !== 'string') {
            return { success: false, error: 'El campo descripcion debe ser una cadena de texto válida' };
        }

        if (imagen_url && typeof imagen_url !== 'string') {
            return { success: false, error: 'El campo imagen_url debe ser una cadena de texto válida' };
        }

        if (precio && typeof precio !== 'number') {
            return { success: false, error: 'El campo precio debe ser un número' };
        }

        if (precio && precio <= 0) {
            return { success: false, error: 'El precio debe ser mayor a 0' };
        }

        // Validar que la imagen sea una URL
        if (imagen_url) {
            const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
            if (!urlPattern.test(imagen_url)) {
                return { success: false, error: 'La imagen_url no es una URL válida' };
            }
        }

        return { success: true };
    }
}
