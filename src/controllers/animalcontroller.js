const db = require("../database/models");
const fs = require("fs");
const path = require("path");
module.exports = {
    // Obtener todos los animales
    list: async (req, res) => {
        try {
            const animals = await db.Animal.findAll({
                include: ['city']
            })
            return res.render("animals/animalList", { animals })
        } catch (error) {
            console.log(error);

        }
    },

    // Obtener un animal por ID
    detail: (req, res) => {
        const animal = animals.find(a => a.id === parseInt(req.params.id));
        if (!animal) {
            return res.status(404).json({ message: 'Animal no encontrado' });
        }
        res.status(200).json({ data: animal });
    },

    add: async (req, res) => {
        try {
            const [cities, species] = await Promise.all([
                db.City.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                }),
                db.Specie.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                })
            ])
            return res.render("animals/animalAdd", {
                cities,
                species
            })
        } catch (error) {
            console.log(error);

        }
    },

    // Crear un nuevo animal
    create: async (req, res) => {
        try {
            const { name, description, age, sex, specieId, cityId } = req.body;
            await db.Animal.create({
                name: name.trim(),
                description: description.trim(),
                age: age.trim(),
                sex,
                specieId,
                cityId,
                image: req.file ? req.file.filename : null
            })
            return res.redirect("/animals")
        } catch (error) {
            console.log(error);
        }
    },

    edit: async (req, res) => {
        try {
            const [cities, species, animal] = await Promise.all([
                db.City.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                }),
                db.Specie.findAll({
                    order: [
                        ['name', 'ASC']
                    ]
                }),
                db.Animal.findByPk(req.params.id)
            ]);

            return res.render("animals/animalEdit", { animal, cities, species })
        } catch (error) {
            console.log(error);
        }
    },

    //  Actualizar un animal
    update: async (req, res) => {
        try {
            const { name, description, age, sex, specieId, cityId } = req.body;
            const animalToUpdate = await db.Animal.findByPk(req.params.id);
            animalToUpdate.name = name.trim();
            animalToUpdate.description = description.trim();
            animalToUpdate.age = age.trim();
            animalToUpdate.sex = sex;
            animalToUpdate.specieId = specieId;
            animalToUpdate.cityId = cityId;
            
            if(req.file && animalToUpdate.image){
                const imagePath = path.join("public", "images", animalToUpdate.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
                animalToUpdate.image = req.file.filename;
            } else if(req.file) {
                animalToUpdate.image = req.file.filename;
            }

            await animalToUpdate.save();
            return res.redirect("/animals")
           
        } catch (error) {
            console.log(error);
        }
    },

    // Eliminar un animal
    remove: async (req, res) => {
       try {
            const animalToDelete = await db.Animal.findByPk(req.params.id);
            if(animalToDelete.image){
                const imagePath = path.join("public", "images", animalToDelete.image);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            await animalToDelete.destroy();
            return res.redirect("/animals")
       } catch (error) {
        console.log(error);
       }
    }
};
