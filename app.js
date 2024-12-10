const express = require('express');
const path = require('path');

// Inicializar la aplicación
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/index', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html')); // Sirve un archivo HTML
});

// Ruta adicional de ejemplo
app.get('/api/saludo', (req, res) => {
    res.json({ mensaje: '¡Hola, mundo desde Express!' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
