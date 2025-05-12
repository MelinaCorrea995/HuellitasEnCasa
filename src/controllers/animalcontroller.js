const animals = []; 

module.exports = {
    // Obtener todos los animales
    getAnimals: (req, res) => {
        res.status(200).json({ data: animals });
    },

    // Obtener un animal por ID
    getAnimalById: (req, res) => {
        const animal = animals.find(a => a.id === parseInt(req.params.id));
        if (!animal) {
            return res.status(404).json({ message: 'Animal no encontrado' });
        }
        res.status(200).json({ data: animal });
    },

    // Crear un nuevo animal
    createAnimal: (req, res) => {
        const { id, nombre, especie } = req.body;
        if (!id || !nombre || !especie) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }
        const newAnimal = { id, nombre, especie };
        animals.push(newAnimal);
        res.status(201).json({ message: 'Animal creado', data: newAnimal });
    },

    //  Actualizar un animal
    updateAnimal: (req, res) => {
        const index = animals.findIndex(a => a.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ message: 'Animal no encontrado' });
        }
        animals[index] = { ...animals[index], ...req.body };
        res.status(200).json({ message: 'Animal actualizado', data: animals[index] });
    },

    // Eliminar un animal
    deleteAnimal: (req, res) => {
        const index = animals.findIndex(a => a.id === parseInt(req.params.id));
        if (index === -1) {
            return res.status(404).json({ message: 'Animal no encontrado' });
        }
        const deletedAnimal = animals.splice(index, 1);
        res.status(200).json({ message: 'Animal eliminado', data: deletedAnimal });
    }
};
