// usuario.routes.js

import express from 'express';
const router = express.Router();

// Ejemplo de ruta
router.get('/test', (req, res) => {
  res.send('Ruta de usuario funcionando');
});

// Exporta el router como exportación por defecto
export default router;
