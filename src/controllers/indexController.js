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
    admin : async (req,res) => {
        try {
            const cities = await db.City.findAll({
                include : ['animals', 'users']
            })
            const animalsCount = await db.Animal.count();
            const usersCount = await db.User.count();
            const animalInWaiting = await db.Animal.findOne({
                where : {
                    adopted : false
                },
                order : [
                    ['createdAt', 'DESC']
                ],
                limit : 1,
                include : ['city']
            })
            return res.render("admin", {
                cities,
                animalsCount,
                usersCount,
                animalInWaiting
            });

        } catch (error) {
            console.log(error);
            
        }
    }   
}