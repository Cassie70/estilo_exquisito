import express,{json} from 'express'
import {createProdutosRouter} from './routes/productos.js'
import {corsMiddleware} from './middlewares/cors.js'
import { ProductosModelo } from './models/mysql/productos.js'
//import 'dotenv/config'
const app = express()
app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/productos', createProdutosRouter({productosModelo:ProductosModelo}))

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})