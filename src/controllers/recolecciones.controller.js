const conexion = require('../db/conexion');
const response = require('express');

// Agregar una nueva solicitud de recolección
const addRecoleccion = (req, res = response) => {
  const {
    Estado,
    solicitante,
    direccion,
    empresaRecolectora,
    recolector,
    recoleccion,
    tipoResiduo,
    kg,
    fechaSolicitud,
    fechaRecoleccion,
    fechaAprobacion,
    Notificacion,
    observacion
  } = req.body;

  const sql = `INSERT INTO solicitudrecoleccion 
    (Estado, solicitante, direccion, empresaRecolectora, recolector, recoleccion, tipoResiduo, kg, fechaSolicitud, fechaRecoleccion, fechaAprobacion, Notificacion, observacion) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [Estado, solicitante, direccion, empresaRecolectora, recolector, recoleccion, tipoResiduo, kg, fechaSolicitud, fechaRecoleccion, fechaAprobacion, Notificacion, observacion];

  conexion.query(sql, values, (err) => {
    if (err) {
      console.error('Error al agregar la solicitud de recolección:', err);
      res.status(500).json({ msg: 'Error interno del servidor' });
    } else {
      res.status(201).json({ msg: 'Solicitud de recolección agregada correctamente' });
    }
  });
};

// Eliminar una solicitud por ID
const deleteRecoleccion = (req, res = response) => {
  const { idSolicitud } = req.body;

  if (!idSolicitud) {
    return res.status(400).json({ msg: 'Se requiere el ID de la solicitud' });
  }

  const sql = 'DELETE FROM solicitudrecoleccion WHERE idSolicitud = ?';
  conexion.query(sql, [idSolicitud], (err, result) => {
    if (err) {
      console.error('Error al eliminar la solicitud:', err);
      res.status(500).json({ msg: 'Error interno del servidor' });
    } else if (result.affectedRows > 0) {
      res.status(200).json({ msg: 'Solicitud eliminada correctamente' });
    } else {
      res.status(404).json({ msg: 'Solicitud no encontrada' });
    }
  });
};

// Listar todas las solicitudes
const listRecolecciones = (req, res = response) => {
  const sql = `SELECT * FROM solicitudrecoleccion`;

  conexion.query(sql, (err, data) => {
    if (err) {
      console.error('Error al obtener las solicitudes:', err);
      res.status(500).json({ msg: 'Error interno del servidor' });
    } else {
      res.status(200).json(data);
    }
  });
};

// Obtener una solicitud específica por ID
const getRecoleccionById = (req, res = response) => {
  const { idSolicitud } = req.params;

  const sql = `SELECT * FROM solicitudrecoleccion WHERE idSolicitud = ?`;

  conexion.query(sql, [idSolicitud], (err, data) => {
    if (err) {
      console.error('Error al obtener la solicitud:', err);
      res.status(500).json({ msg: 'Error interno del servidor' });
    } else if (data.length === 0) {
      res.status(404).json({ msg: 'Solicitud no encontrada' });
    } else {
      res.status(200).json(data[0]);
    }
  });
};

// Actualizar una solicitud completa
const updateRecoleccion = (req, res = response) => {
  const {
    idSolicitud,
    Estado,
    direccion,
    empresaRecolectora,
    recolector,
    recoleccion,
    tipoResiduo,
    kg,
    fechaSolicitud,
    fechaRecoleccion,
    fechaAprobacion,
    Notificacion,
    observacion
  } = req.body;

  if (!idSolicitud) {
    return res.status(400).json({ msg: 'Se requiere el ID de la solicitud' });
  }

  const sql = `UPDATE solicitudrecoleccion 
    SET Estado = ?, direccion = ?, empresaRecolectora = ?, recolector = ?, recoleccion = ?, tipoResiduo = ?, kg = ?, fechaSolicitud = ?, fechaRecoleccion = ?, fechaAprobacion = ?, Notificacion = ?, observacion = ? 
    WHERE idSolicitud = ?`;

  const values = [Estado, direccion, empresaRecolectora, recolector, recoleccion, tipoResiduo, kg, fechaSolicitud, fechaRecoleccion, fechaAprobacion, Notificacion, observacion, idSolicitud];

  conexion.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar la solicitud:', err);
      res.status(500).json({ msg: 'Error interno del servidor' });
    } else if (result.affectedRows > 0) {
      res.status(200).json({ msg: 'Solicitud actualizada correctamente' });
    } else {
      res.status(404).json({ msg: 'Solicitud no encontrada' });
    }
  });
};

// Actualizar solo el estado de una solicitud
const updateEstadoRecoleccion = (req, res = response) => {
  const { idSolicitud, Estado } = req.body;

  if (!idSolicitud || !Estado) {
    return res.status(400).json({ msg: 'Se requieren el ID y el nuevo estado' });
  }

  const sql = `UPDATE solicitudrecoleccion SET Estado = ? WHERE idSolicitud = ?`;

  conexion.query(sql, [Estado, idSolicitud], (err, result) => {
    if (err) {
      console.error('Error al actualizar el estado de la solicitud:', err);
      res.status(500).json({ msg: 'Error interno del servidor' });
    } else if (result.affectedRows > 0) {
      res.status(200).json({ msg: 'Estado actualizado correctamente' });
    } else {
      res.status(404).json({ msg: 'Solicitud no encontrada' });
    }
  });
};

module.exports = {
  addRecoleccion,
  deleteRecoleccion,
  listRecolecciones,
  getRecoleccionById,
  updateRecoleccion,
  updateEstadoRecoleccion
};
