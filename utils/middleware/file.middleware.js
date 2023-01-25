// Vamos a crear un middleware, que va a guardar los archivos que suba el usuario.
// Los va a guardar en la carpeta uploads.
// Necesitamos instalar MULTER como dependencia.

// Requerimos la libreria de multer y path que se va a encarga de indicar a multer en que carpeta tiene que guardar las imagenes.
const multer = require('multer');
const path = require('path');
const createError = require('../errors/create-error');

// Creo un array, con la clase de archivos que vamos a permitir subir, asi no me pueden dañar el servidor con un ejtecutable.
// Si va a tener siempre el mismo valor, se nombra en maysuculas.
const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

// Creamos el filtro de archivos.
// Indicamos que si no esta includio en valid_file reporte un error.
// Si es valido, devolvemos la call back con un null y un true.
const fileFilter = (req, file, cb) => {
    if (!VALID_FILE_TYPES.includes(file.mimetype)) {
        cb(createError('El tipo de archivo no es valido'));
    } else {
        cb(null, true);
    }
};

// Creamos el almacén de archivos.
// Lo vamos a almacenar en una constante que proviene de multer.diskStorage.
// filname nos va a devolver el nombre de el archivo.
// En la call back, null por que no queremos mandar el error si lo hubiese, mandamos el nombe original mas la fecha actual.
// Destination indicamos la carpeta destino, path.join para unir el path, dirname (directorio actual, raiz) y el directorio destino.
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    },
    destination: (req, file, cb) => {
        // cb(null, path.join(__dirname, '../../public/uploads'));
        // Para usar con vercel.
        cb(null, '/tmp');
    }
}) 

// Creamos el middleware que vamos a exportar, le pasamos la Storage y fileFilter.
const upload = multer ({
    storage,
    fileFilter
});

// Tenemos que añadir el atributo a el Schema.

module.exports = upload;