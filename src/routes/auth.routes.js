import { Router } from 'express';
import pool from '../config/db.js';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/login', async (req, res) => {
    const { correo, password } = req.body;

    if (!correo || !password) {
        return res.status(400).json({ success: false, message: 'Correo y contraseña requeridos' });
    }

    try {
        // Consulta a la base de datos
        const [results] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);

        if (results.length > 0) {
            const user = results[0];

            // Compara la contraseña ingresada con la encriptada
            const passwordMatch = await bcrypt.compare(password, user.password);

            if (passwordMatch) {
                const token = 'TOKEN123'; // Aquí puedes generar un JWT real si quieres

                return res.json({
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
            } else {
                return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
            }
        } else {
            return res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
        }

    } catch (err) {
        console.error('Error en el login:', err);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

router.post('/registro', async (req, res) => {
    const { documento, nombre, apellido, telefono, correo, direccion, password, rol = 'usuario', estado = 'Activo' } = req.body;

    if (!correo || !password) {
        return res.status(400).json({ success: false, message: 'Correo y contraseña requeridos' });
    }

    try {
        // Verificar si el usuario ya existe
        const [existingUser] = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        if (existingUser.length > 0) {
            return res.status(409).json({ success: false, message: 'Correo ya registrado' });
        }

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar usuario
        await pool.query(
            'INSERT INTO usuarios (documento, nombre, apellido, telefono, correo, direccion, password, rol, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [documento, nombre, apellido, telefono, correo, direccion, hashedPassword, rol, estado]
        );

        return res.json({ success: true, message: 'Usuario registrado exitosamente' });

    } catch (err) {
        console.error('Error en registro:', err);
        return res.status(500).json({ success: false, message: 'Error en el servidor' });
    }
});

export default router;
