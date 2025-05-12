const db = require('../database/models')
module.exports = {
    index : async (req,res) => {        
        try {
            const animals = await db.Animal.findAll({
                include : ['city']
            })

            return res.render("index", {animals})

        } catch (error) {
            console.log(error);
        }
    },
    aboutUs: (req,res) =>{
        res.render("aboutUs")
    },
    admin : (req,res) => {
        res.render("admin")
    }   
}