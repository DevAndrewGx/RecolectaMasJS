const { Router } = require('express');
const { loginUsuario, registrarUsuario } = require('../controllers/auth.controller');

const router = Router();

router.post('/login', loginUsuario);
router.post('/registro', registrarUsuario);

module.exports = router;
