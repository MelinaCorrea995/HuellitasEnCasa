const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON
const animalsFilePath = path.join(__dirname, '../data/db.json');

// Función para leer los animales
const getAnimals = () => {
    const data = fs.readFileSync(animalsFilePath, 'utf-8');
    return JSON.parse(data);
};

// Controlador
module.exports = {
    showAdminPage: (req, res) => {
        const animals = getAnimals(); // Lee los datos del archivo JSON
        res.render('animals/admin', { animals }); // Renderiza la vista y envía los datos
},

    // Crear un nuevo animal
    createAnimal: (req, res) => {
        const animals = getAnimals();
        const newAnimal = {
            id: animals.length + 1, // Generar ID automáticamente
            ...req.body
        };
        animals.push(newAnimal);
        saveAnimals(animals);
        res.status(201).json({ mensaje: 'Animal agregado correctamente', newAnimal });
    },

    // Editar un animal existente
    updateAnimal: (req, res) => {
        const animals = getAnimals();
        const id = parseInt(req.params.id);
        const index = animals.findIndex(animal => animal.id === id);

        if (index !== -1) {
            animals[index] = { ...animals[index], ...req.body };
            saveAnimals(animals);
            res.json({ mensaje: 'Animal actualizado correctamente', updatedAnimal: animals[index] });
        } else {
            res.status(404).json({ mensaje: 'Animal no encontrado' });
        }
    },

    // Eliminar un animal
    deleteAnimal: (req, res) => {
        let animals = getAnimals();
        const id = parseInt(req.params.id);
        const filteredAnimals = animals.filter(animal => animal.id !== id);

        if (filteredAnimals.length === animals.length) {
            return res.status(404).json({ mensaje: 'Animal no encontrado' });
        }

        saveAnimals(filteredAnimals);
        res.json({ mensaje: 'Animal eliminado correctamente' });
    }
};





