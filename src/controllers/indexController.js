const animals = require("../../data/animals.json")
module.exports = {
    index : (req,res) => {
        res.render("index", {animals})
    },
    aboutUs: (req,res) =>{
        res.render("aboutUs")
      }
}