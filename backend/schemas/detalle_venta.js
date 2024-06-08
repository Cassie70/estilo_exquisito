export class SchemaDetalleVenta {
    
    static validarCrearDetalleVenta({ id_venta, id_producto, precio_unitario, cantidad, id_talla }) {
        if (!id_venta || !id_producto || !precio_unitario || !cantidad || !id_talla) {
            return { success: false, error: 'Se requieren todos los campos: id_venta, id_producto, precio_unitario, cantidad e id_talla' };
        }

        if (typeof id_venta !== 'string' || typeof id_producto !== 'number' || typeof precio_unitario !== 'number' || typeof cantidad !== 'number' || typeof id_talla !== 'number') {
            return { success: false, error: 'Los tipos de datos no son válidos para id_venta, id_producto, precio_unitario, cantidad o id_talla' };
        }

        if (precio_unitario <= 0 || cantidad <= 0) {
            return { success: false, error: 'El precio unitario y la cantidad deben ser valores positivos' };
        }

        return { success: true };
    }

    static validarPrecioUnitario(precio ) {
        const { precio_unitario} = precio;
        if (typeof precio_unitario !== 'number') {
            return { success: false, error: 'El campo monto debe ser de tipo number' };
        }

        if (precio_unitario <= 0) {
            return { success: false, error: 'El monto debe ser mayor a 0' };
        }
        
        return { success: true };
    }

    static validarCantidad(cantidades) {
        const { cantidad} = cantidades;
        if (!cantidad || typeof cantidad !== 'number' || cantidad <= 0) {
            return { success: false, error: 'La cantidad debe ser un número positivo' };
        }

        return { success: true };
    }
}
