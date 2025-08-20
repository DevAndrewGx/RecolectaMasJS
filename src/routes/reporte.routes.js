const router = require("express").Router();
const { getReportes, renderReportes } = require("../controllers/reporte.controller");

// Renderiza la vista
router.get("/", renderReportes);

// Genera y descarga el reporte en Excel
router.get("/descargar", getReportes);

module.exports = router;
