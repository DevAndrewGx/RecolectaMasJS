// importamos express y las rutas
import express from "express";
import usuarioRoutes from "./routes/usuario.routes.js";
import reporteRoutes from "./routes/reporte.routes.js";
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';
// creamos una intancia de la app con exprss
const app = express();

// Permite usar __dirname con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware para parsear el JSON en las peticiones 
app.use(express.json());



app.use('/api', authRoutes);


// ¡Aquí es donde se hace pública la carpeta public!
app.use(express.static(path.join(__dirname, "../public")));

// Ruta para servir el index.html desde /src/views/
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
// configuramos las rutas para usuarios
app.use("/api/usuarios", usuarioRoutes);

// configuramos las rutas para los reportes
app.use("/api/reportes", reporteRoutes);

app.get('/registro.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'registro.html'));
});

// exportamos como modulo la app
export default app;
