

export class ProductosController{

    constructor({productosModelo}){
        this.productosModelo = productosModelo
    }

    getAll = async (req, res)=>{
        const productos = await this.productosModelo.getAll()
        res.json(productos)
    }

    getById = async (req, res)=>{
        const {id} = req.params
        const producto = await this.productosModelo.getById(id)
        if(producto) return res.json(producto)
        res.status(404).json({error: 'Producto no encontrado'})
    }

    create = async (req, res)=>{
        const result = req.body // Aquí se debería validar el body con un schema validarProducto(req.body)
        //if(!result.success) 
            //return res.status(400).json(result)
        const newProducto = await this.productosModelo.create({input: result})

        res.status(201).json(newProducto)
    }
}