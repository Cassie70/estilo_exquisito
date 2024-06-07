import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const  DEFAULT_DB_CONFIG = {
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: '',
    database: 'estilo_exquisito_db'
}
// Crear la conexión a la base de datos
const connectionString = process.env.MYSQL_ADDON_URI ?? DEFAULT_DB_CONFIG;

const connection = await mysql.createConnection(connectionString);

// Conectar a la base de datos
try {
  await connection.connect();
  console.log('Connected to the database');
  console.log('Connection host:', connection.config.host);
} catch (err) {
  console.error('Error connecting to the database:', err);
}

export default connection;