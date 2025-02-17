const fs = require('fs');
const path = require('path');

// Ruta al archivo JSON
const animalsFilePath = path.join(__dirname, '../data/db.json');


module.exports = {
    // Función para leer los animales
    getAnimals : () => {
        const data = fs.readFileSync(animalsFilePath, 'utf-8');
        return JSON.parse(data);
    },
    
    // Función para guardar los animales en el archivo JSON
    saveAnimals : (animals) => {
        fs.writeFileSync(animalsFilePath, JSON.stringify(animals, null, 2), 'utf-8');
    },
    // Mostrar la página de administración con los animales
    showAdminPage: (req, res) => {
        const animals = getAnimals(); // Lee los datos del archivo JSON
        res.render('animals/admin', { animals }); // Renderiza la vista y envía los datos
    },

    // Crear un nuevo animal
    createAnimal: (req, res) => {
        const animals = getAnimals();
        const newAnimal = {
            id: animals.length + 1, // Generar ID automáticamente (puedes ajustar esta lógica)
            ...req.body  // Los datos del nuevo animal vienen del cuerpo de la solicitud
        };
        animals.push(newAnimal);  // Agrega el nuevo animal al arreglo
        saveAnimals(animals);  // Guarda los animales actualizados

        res.status(201).json({
            mensaje: 'Animal agregado correctamente',
            newAnimal
        });
    },

    // Editar un animal existente
    updateAnimal: (req, res) => {
        const animals = getAnimals();
        const id = parseInt(req.params.id);
        const index = animals.findIndex(animal => animal.id === id);

        if (index !== -1) {
            // Actualiza los datos del animal encontrado con los nuevos datos del cuerpo de la solicitud
            animals[index] = { ...animals[index], ...req.body };
            saveAnimals(animals);  // Guarda los animales actualizados

            res.json({
                mensaje: 'Animal actualizado correctamente',
                updatedAnimal: animals[index]
            });
        } else {
            res.status(404).json({ mensaje: 'Animal no encontrado' });
        }
    },

    // Eliminar un animal
    deleteAnimal: (req, res) => {
        let animals = getAnimals();
        const id = parseInt(req.params.id);
        const filteredAnimals = animals.filter(animal => animal.id !== id);  // Filtra el animal por ID

        if (filteredAnimals.length === animals.length) {
            return res.status(404).json({ mensaje: 'Animal no encontrado' });
        }

        saveAnimals(filteredAnimals);  // Guarda los animales actualizados sin el animal eliminado

        res.json({ mensaje: 'Animal eliminado correctamente' });
    }
};
