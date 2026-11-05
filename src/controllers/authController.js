// Importamos bcryptjs para proteger las contraseñas
const bcrypt = require('bcryptjs');

// Creamos un arreglo para almacenar los usuarios registrados
const usuarios = [];

// Función para registrar un usuario
const registrarUsuario = async (req, res) => {
    try {
        // Recibimos el usuario y la contraseña
        const { usuario, password } = req.body;

        // Verificamos que los campos no estén vacíos
        if (!usuario || !password) {
            return res.status(400).json({
                mensaje: 'Debe ingresar usuario y contraseña'
            });
        }

        // Comprobamos si el usuario ya existe
        const existe = usuarios.find(u => u.usuario === usuario);

        if (existe) {
            return res.status(409).json({
                mensaje: 'El usuario ya está registrado'
            });
        }

        // Encriptamos la contraseña antes de guardarla
        const passwordHash = await bcrypt.hash(password, 10);

        // Guardamos el nuevo usuario
        usuarios.push({
            usuario,
            password: passwordHash
        });

        return res.status(201).json({
            mensaje: 'Usuario registrado correctamente'
        });

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error al registrar el usuario'
        });
    }
};

// Función para iniciar sesión
const iniciarSesion = async (req, res) => {
    try {
        // Recibimos las credenciales
        const { usuario, password } = req.body;

        // Buscamos el usuario registrado
        const usuarioEncontrado = usuarios.find(u => u.usuario === usuario);

        // Verificamos si existe y si la contraseña coincide
        if (!usuarioEncontrado ||
            !(await bcrypt.compare(password, usuarioEncontrado.password))) {
            return res.status(401).json({
                mensaje: 'Error en la autenticación'
            });
        }

        // Si los datos son correctos, confirmamos el acceso
        return res.status(200).json({
            mensaje: 'Autenticación satisfactoria'
        });

    } catch (error) {
        return res.status(500).json({
            mensaje: 'Error interno del servidor'
        });
    }
};

// Exportamos las funciones para utilizarlas en las rutas
module.exports = {
    registrarUsuario,
    iniciarSesion
};