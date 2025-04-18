const multer = require('multer');
const storage = multer.diskStorage({
destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/images/users/')); // Dirección donde se guardarán las imágenes
},
filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Crear nombre único
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)); // Nombre de archivo con extensión
}
});

module.export = multer({ storage: storage })  

// Cree esta carpeta para ver si cambiaba en algo tener aparte el middlware . pero fue lo mismo ..