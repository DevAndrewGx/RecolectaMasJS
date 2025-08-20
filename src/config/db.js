const mysql = require('mysql');
const dotenv = require("dotenv");
const conexion = require('../db/conexion');


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

module.exports = conexion;

conexion.getConnection((err, connection) => {
  if (err) {
      console.error('Error al obtener la conexión del pool:', err);
      return;
  }
  
  console.log('Conexión obtenida del pool:', connection.threadId);
  connection.release();
  console.log('Conexión liberada:', connection.threadId);
});
