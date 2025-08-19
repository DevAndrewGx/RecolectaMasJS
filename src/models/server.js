const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8282;

    // Paths
    this.paths = {
      recolecciones: "/api/recolecciones"
    };

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
  }

  routes() {
    this.app.use(this.paths.recolecciones, require("../routes/recolecciones.routes"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Servidor escuchando en http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
