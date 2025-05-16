const db = require('../database/models')

module.exports = {

  preAdopt: async (req, res) => {
    try {
      const { id } = req.params;
      const animal = await db.Animal.findByPk(id);
      return res.render('animals/preAdopt', { animal });

    } catch (error) {
      console.log(error);
    }
  },
  // TODO: validar que el email no esté registrado
  processPreAdoption: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, phone, reasons, rent, dwelling, petsAllowed, allergy, underTreatment } = req.body;
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
     
      return res.redirect('/animals/preadoptThanks');
    } catch (error) {
      console.log(error);
    }
  },
  adoptDetail: (req, res) => {
    const animalId = parseInt(req.params.id); // Captura el parámetro 'id' de la URL como número
    const animal = animals.find(a => a.id === animalId); // Busca el animal por ID

    if (animal) {
      res.render('animals/adoptDetail', { animal }); // Renderiza la vista adoptDetail.ejs con los datos del animal encontrado
    } else {
      res.status(404).render('error', {
        message: 'Animal no encontrado' // Página de error personalizada
      });
    }
  },
  adoptStories: (req, res) => {
    res.render("animals/adoptStories")
  },
  preadoptForm: (req, res) => {
    res.render('animals/preadoptThanks');
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


