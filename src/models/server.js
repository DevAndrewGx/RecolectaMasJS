const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path');
const reporteRouter = require("../routes/reporte.routes");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8282;

    // Paths
    this.paths = {
      recolecciones: "/api/recolecciones",
      reportes: "/reportes"
    };

    // Configuración de vistas con el motor de plantillas ejs
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "../views"));

    // Inicializar middlewares y rutas
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors({
      origin: ['http://localhost:8282', 'http://localhost:3000'],
      methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
      credentials: true
    }));

    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static(path.join(__dirname, "public"))); // css/js/img
  }
  
  routes() {
    // this.app.use(this.paths.recolecciones, require("../routes/recolecciones.routes"));
    this.app.use('/reportes', reporteRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
