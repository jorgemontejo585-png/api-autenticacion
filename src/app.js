// Importamos Express para crear el servidor
const express = require('express');

// Importamos las rutas de autenticación
const authRoutes = require('./Routes/authRoutes');

// Creamos la aplicación
const app = express();

// Configuramos Express para recibir datos en formato JSON
app.use(express.json());

// Indicamos que las rutas de autenticación comienzan con /api
app.use('/api', authRoutes);

// Definimos el puerto del servidor
const PORT = 3000;

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});