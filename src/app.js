// importamos express
import express from "express";
import usuarioRoutes from "./routes/usuario.routes.js";

// creamos una intancia de la app con exprss
const app = express();

// middleware para parsear el JSON en las peticiones 
app.use(express.json());

// configuramos las rutas
app.use("/api/usuarios", usuarioRoutes);


// exportamos como modulo la app
export default app;
