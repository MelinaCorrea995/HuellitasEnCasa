module.exports = {
    // muestrar la lista de historias
    index : (req,res) => {
        res.render("history")
    },
    // formulario para crear una nueva historia
    create : (req,res) => {
        res.render("history")
    },
    // procesar la creación de una nueva historia
    save : (req,res) => {
        res.render("history")
    },
    // formulario para editar una historia existente
    edit : (req,res) => {
        res.render("history")
    },
    // procesar la edición de una historia existente
    update : (req,res) => {
        res.render("history")
    },
    // eliminar una historia
    delete : (req,res) => {
        res.render("history")
    }
}