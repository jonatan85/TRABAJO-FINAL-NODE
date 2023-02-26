// Importamos el create-error.
const createError = require('../errors/create-error');

// La cookie mientras este activa nos devuelve request.isAuthenticated.
// isAuthenticated nos delvulve un true o un false.
// Si es true, con un next si error para que pase a el siguiente paso.
// Si nos devulve un false, mandamos a el usuario un mensaje de erro y un 401, que es un error de inicio de sesión.
const isAuthMovie = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    } else {
        return next (createError('No tienes permisos', 401));
    }
}

// Exportamos el middleware.
module.exports = isAuthMovie;