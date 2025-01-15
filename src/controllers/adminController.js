const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON
const animalsFilePath = path.join(__dirname, '../data/animals.json');

// Función para leer los animales
const getAnimals = () => {
    const data = fs.readFileSync(animalsFilePath, 'utf-8');
    return JSON.parse(data);
};

// Controlador
const adminController = {
    showAdminPage: (req, res) => {
        const animals = getAnimals(); // Lee los datos del archivo JSON
        res.render('animals/admin', { animals }); // Renderiza la vista y envía los datos
    },
    // Otras funciones (editar, eliminar, etc.) podrían ir aquí
};

module.exports = adminController;
