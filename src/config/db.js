// importamos los modulos que vamos a utliziar 
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;

conexion.getConnection((err, connection) => {
  if (err) {
      console.error('Error al obtener la conexión del pool:', err);
      return;
  }
  
  console.log('Conexión obtenida del pool:', connection.threadId);
  connection.release();
  console.log('Conexión liberada:', connection.threadId);
});
