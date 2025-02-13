//adoptionController.js
// Importa la base de datos de animales
const animals = require('../../data/db.json'); // Ajusta la ruta al JSON

module.exports = {
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
  adoptStories: (req,res) =>{
    res.render("animals/adoptStories")
  }
};


