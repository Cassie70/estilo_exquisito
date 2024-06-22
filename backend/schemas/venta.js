export class SchemaVenta {
    static validarCreateVenta(venta) {
        const { id_usuario, monto } = venta;

        if (!id_usuario || !monto) {
            return { success: false, error: 'Faltan campos por llenar' };
        }

        if (typeof id_usuario !== 'string') {
            return { success: false, error: 'El campo id_usuario debe ser de tipo string' };
        }

        if (typeof monto !== 'number') {
            return { success: false, error: 'El campo monto debe ser de tipo number' };
        }

        if (monto <= 0) {
            return { success: false, error: 'El monto debe ser mayor a 0' };
        }

        return { success: true };
    }

    static validarUpdateVenta(venta) {
        const { id_usuario, monto, fecha, estado } = venta;

        if (id_usuario && typeof id_usuario !== 'string') {
            return { success: false, error: 'El campo id_usuario debe ser de tipo string' };
        }

        if (monto !== undefined && typeof monto !== 'number') {
            return { success: false, error: 'El campo monto debe ser de tipo number' };
        }

        if (monto <= 0) {
            return { success: false, error: 'El monto debe ser mayor a 0' };
        }

        if (fecha) {
            const fechaRegex = /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/;
            if (!fechaRegex.test(fecha)) {
                return { success: false, error: 'Formato de fecha inválido. Debe ser YYYY-MM-DD HH:MM:SS' };
            }
        }

        if (estado !== undefined && typeof estado !== 'boolean') {
            return { success: false, error: 'El campo estado debe ser de tipo boolean' };
        }

        return { success: true };
    }
}
