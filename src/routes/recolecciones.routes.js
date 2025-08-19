const express = require('express');
const router = express.Router();

const {
  addRecoleccion,
  deleteRecoleccion,
  listRecolecciones,
  getRecoleccionById,
  updateRecoleccion,
  updateEstadoRecoleccion
} = require('../controllers/recolecciones.controller');

router.post('/', addRecoleccion);

router.delete('/', deleteRecoleccion);

router.get('/', listRecolecciones);

router.get('/:idSolicitud', getRecoleccionById);

router.put('/', updateRecoleccion);

router.patch('/estado', updateEstadoRecoleccion);

module.exports = router;
