//Aqui irán las validaciones de los productos para que no se puedan guardar productos con campos vacios 
//o con campos que no sean del tipo que se espera en la base de datos

export class SchemaProducto{

    static validarCreateProducto(producto){

        const {nombre, descripcion, precio, imagen_url} = producto
    
        if(!nombre || !descripcion || !precio || !imagen_url){
            return {success: false, error: 'Faltan campos por llenar'}
        }
    
        if(typeof nombre !== 'string' || typeof descripcion !== 'string' || typeof imagen_url !== 'string'){
            return {success: false, error: 'Los campos nombre, descripcion e imagen_url deben ser de tipo string'}
        }
    
        if(typeof precio !== 'number'){
            return {success: false, error: 'El campo precio debe ser de tipo number'}
        }
    
        if(precio <= 0){
            return {success: false, error: 'El precio debe ser mayor a 0'}
        }
    
        //Validar que la imagen sea una url (pendiente)
        return {success: true}
    }


    
}


