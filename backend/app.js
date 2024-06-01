import express,{json} from 'express'
import {createProdutosRouter} from './routes/productos.js'
import {corsMiddleware} from './middlewares/cors.js'
import { ProductosModelo } from './models/mysql/productos.js'


//este es el punto de entrada de la aplicacion, aqui se configura el servidor y se definen las rutas usando express

//se crea una instancia de express para iniciar el servidor y se le pasan los middlewares que se van a usar
const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

//al crear la ruta de productos se le pasa como parametro el modelo de productos que se va a usar
app.use('/productos', createProdutosRouter({productosModelo:ProductosModelo}))


//Aqui se define el puerto en el que se va a correr el servidor, si no se define se usara el puerto 1234
const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})