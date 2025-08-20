const pool = require('../config/db'); 
const bcrypt = require('bcrypt');
const response = require('express');


const loginUsuario = async (req, res = response) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ success: false, message: 'Correo y contraseña requeridos' });
  }

  try {
    // Buscar usuario
    const [results] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    const user = results[0];

    // Comparar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }

    const token = 'TOKEN123'; // Aquí deberías implementar un JWT real

    res.status(200).json({
      success: true,
      message: 'Login exitoso',
      token,
      user: {
        id: user.idUsuario,
        correo: user.correo,
        nombre: user.nombre,
        apellido: user.apellido
      }
    });

  } catch (err) {
    console.error('Error en el login:', err);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};


// REGISTRO
const registrarUsuario = async (req, res = response) => {
  const { documento, nombre, apellido, telefono, correo, direccion, password, rol = 'usuario', estado = 'Activo' } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ success: false, message: 'Correo y contraseña requeridos' });
  }

  try {
    // Verificar si el correo ya existe
    const [existingUser] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);

    if (existingUser.length > 0) {
      return res.status(409).json({ success: false, message: 'Correo ya registrado' });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar en BD
    await pool.query(
      `INSERT INTO usuarios 
      (documento, nombre, apellido, telefono, correo, direccion, password, rol, estado) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [documento, nombre, apellido, telefono, correo, direccion, hashedPassword, rol, estado]
    );

    res.status(201).json({ success: true, message: 'Usuario registrado exitosamente' });

  } catch (err) {
    console.error('Error en registro:', err);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
};


module.exports = {
  loginUsuario,
  registrarUsuario
};
