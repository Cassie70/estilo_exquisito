/*
Este controlador se encarga de manejar las peticiones de productos. Por tanto aqui se harán validaciones mediante schemas 
de los datos que se reciben en las peticiones y se enviarán al modelo para que este interactue con la base de datos para
finalmente retornar una respuesta al cliente.
*/

import { SchemaProducto } from "../schemas/productos.js"

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
        const producto = await this.productosModelo.getById({id})
        if(producto) return res.json(producto)
            res.status(404).json({error: 'Producto no encontrado'})
    }

    create = async (req, res)=>{
        const result = SchemaProducto.validarCreateProducto(req.body) 
        if(!result.success) 
            return res.status(400).json(result)
        const newProducto = await this.productosModelo.create({input: req.body})

        res.status(201).json(newProducto)
    }
    update = async (req, res)=>{

        console.log(req.body)
        const {id} = req.params //falta validar que la id exista en la base de datos
        //const result = SchemaProducto.validarUpdateProducto(req.body)
        //if(!result.success) 
            //return res.status(400).json(result)

        const updatedProducto = await this.productosModelo.update({id, input: req.body})

        res.json(updatedProducto)
    
    }

    delete = async (req, res)=>{
        const {id} = req.params
        const deletedProducto = await this.productosModelo.delete({id})
    
        res.json(deletedProducto)
    }

}



