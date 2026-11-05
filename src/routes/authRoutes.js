// Importamos Express para crear las rutas
const express = require('express');

// Importamos las funciones del controlador
const {
    registrarUsuario,
    iniciarSesion
} = require('../controllers/authController');

// Creamos el enrutador
const router = express.Router();

// Ruta para registrar usuarios
router.post('/registro', registrarUsuario);

// Ruta para iniciar sesión
router.post('/login', iniciarSesion);

// Exportamos las rutas
module.exports = router;