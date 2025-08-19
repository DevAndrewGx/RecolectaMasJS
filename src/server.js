// importamos la app y los modulos necesarios
import app from "./app.js";
import dotenv from "dotenv";

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno desde la raíz
dotenv.config({ path: path.resolve(__dirname, '../.env') });


const PORT = process.env.PORT || 4000;

// levantamos el server
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
