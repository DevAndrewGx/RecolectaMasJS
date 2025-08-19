// importamos express y las rutas
import express from "express";
import usuarioRoutes from "./routes/usuario.routes.js";
import reporteRoutes from "./routes/reporte.routes.js";

// creamos una intancia de la app con exprss
const app = express();

// middleware para parsear el JSON en las peticiones 
app.use(express.json());

// configuramos las rutas para usuarios
app.use("/api/usuarios", usuarioRoutes);

// configuramos las rutas para los reportes
app.use("/api/reportes", reporteRoutes);

const recoleccionRoutes = require('./routes/recoleccionRoutes');
app.use('/api/recolecciones', recoleccionRoutes);

// exportamos como modulo la app
export default app;
