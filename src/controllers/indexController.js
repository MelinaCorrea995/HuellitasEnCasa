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
            const [cities, animalsCount, usersCount, animalInWaiting, adoptionsCount] = await Promise.all([
                db.City.findAll({
                    include : ['animals', 'users']
                }),
                db.Animal.count(),
                db.User.count(),
                db.Animal.findOne({
                    where : {
                        adopted : false
                    },
                    order : [
                        ['createdAt', 'DESC']
                    ],
                    limit : 1,
                    include : ['city']
                }),
                db.Adoption.count()
            ])
           
            return res.render("admin", {
                cities,
                animalsCount,
                usersCount,
                animalInWaiting,
                adoptionsCount
            });

        } catch (error) {
            console.log(error);
            
        }
    }   
}