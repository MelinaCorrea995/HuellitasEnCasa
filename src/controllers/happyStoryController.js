const happystory = require('../../data/db.json');

module.exports = {
adoptDetail: (req, res) => {
    const animalId = parseInt(req.params.id, 10);
    if (isNaN(animalId)) {
    return res.status(400).render("error", {
        message: "ID de animal inválido",
    });
    }
    const animal = happystory.find((a) => a.id === animalId); // Busca el animal por ID
    if (animal) {
      res.render("adoptDetail", { animal }); // Renderiza la vista adoptDetail.ejs con los datos del animal encontrado
    } else {
    res.status(404).render("error", {
        message: "Animal no encontrado",
      }); // Página de error personalizada
    }
},
};

// adoptstories = happystory.js=happyStoryController.js te lo aclaro por que
//  a mi me mareo tanto nombre iguales para saber que hace que 