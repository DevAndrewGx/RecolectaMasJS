// importamos router y el controlador
import { Router } from "express";
import { ReporteController } from "../controllers/reporte.controller.js";

//creamos una instancia de router para utilizar
const router = Router();


// definimos la ruta para obtener el reporte de usuarios
router.get("/usuarios/excel", ReporteController.usuariosExcel);

// exportamos el router como modulo
export default router;
