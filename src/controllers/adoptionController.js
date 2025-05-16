const { validationResult } = require('express-validator');
const db = require('../database/models');
const moment = require('moment');

module.exports = {

  preAdopt: async (req, res) => {
    try {
      const { id } = req.params;
      const animal = await db.Animal.findByPk(id);
      const user = await db.User.findByPk(req.session.userLogin?.id);
      return res.render('adoptions/preAdopt', { animal, oldData : user });

    } catch (error) {
      console.log(error);
    }
  },
  processPreAdoption: async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const { id } = req.params;
        const animal = await db.Animal.findByPk(id);
        return res.render('adoptions/preAdopt', {
          errors,
          oldData: req.body,
          animal
        });
      } else {
        const { id } = req.params;
        const { name, surname, email, phone, reasons, rent, dwelling, petsAllowed, allergy, underTreatment } = req.body;
        let userId;
        if (req.session.userLogin) {
          userId = req.session.userLogin.id;
        } else {
          const user = await db.User.create({
            name,
            surname,
            email,
            phone,
            rolId: 2
          });
          userId = user.id;
        }
  
        await db.Adoption.create({
          userId,
          animalId: id,
          status: 'En proceso',
          reasons,
          rent,
          dwelling,
          petsAllowed,
          allergy,
          underTreatment
        });
        return res.redirect('/adoptions/preAdoptThanks/' + id);
      }
     
    } catch (error) {
      console.log(error);
    }
  },
  preAdoptThanks: async (req, res) => {
    try {
      const { id } = req.params;
      const animal = await db.Animal.findByPk(id);
      return res.render('adoptions/preAdoptThanks', { animal });
    } catch (error) {
      console.log(error);
    }
  },
  adoptStories: (req, res) => {
    res.render("animals/adoptStories")
  },
  adoptionsRegister: async (req, res) => {
    try {
      const adoptions = await db.Adoption.findAll({
        include: [
          {
            model: db.User,
            as: 'user',
            attributes: ['name', 'surname', 'email', 'phone']
          },
          {
            model: db.Animal,
            as: 'animal',
            attributes: ['name', 'image']
          }
        ]
      });
      return res.render('adoptions/adoptionsList', { adoptions, moment });
    } catch (error) {
      console.log(error);
    }
  },

  adoptProcess: async (req, res) => {
    try {
      const { id } = req.params;
      const { adoptante } = req.body;

      // Buscar el animal
      const animalIndex = animals.findIndex(a => a.id === parseInt(id));

      if (animalIndex === -1) {
        return res.status(404).render('error', {
          message: 'Animal no encontrado'
        });
      }

      // Actualizar estado del animal
      animals[animalIndex] = {
        ...animals[animalIndex],
        adoptado: true,
        adoptante: adoptante,
        fechaAdopcion: new Date()
      };

      // Guardar cambios en el JSON
      const fs = require('fs');
      fs.writeFileSync(
        require('path').join(__dirname, '../data/db.json'),
        JSON.stringify(animals, null, 2)
      );

      res.render('animals/adoptSuccess', {
        animal: animals[animalIndex],
        adoptante: adoptante
      });

    } catch (error) {
      console.error('Error en el proceso de adopción:', error);
      res.status(500).render('error', {
        message: 'Error al procesar la adopción'
      });
    }
  }

};


