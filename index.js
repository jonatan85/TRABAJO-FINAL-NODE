// requerimos dotenv para que guarde todas las variables de entorno.
require('dotenv').config();

const express = require('express');
const moviesRoutes = require('./routes/movies.routes.js');
const cinemasRoutes = require('./routes/cinema.routes.js');
const connect = require('./utils/db/connect.js');
const cors = require('cors');
const passport = require('passport');
const userRouter = require('./routes/user.routes.js');
const userDataRoutes = require('./routes/userData.routes.js');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const DB_URL = process.env.DB_URL;
const path = require('path');
const cloudinary = require('cloudinary');
const platesRoutes = require('./routes/plates.routes.js');
const dietsRoutes = require('./routes/diets.routes');

// Conexion con la base de datos.
connect();

// Puerto por el que vamos a navegar.
const PORT = process.env.PORT || 4000;
const server = express();

// Añadimos la configuración de claudinari.
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET
  });

  const whitelist =['http://localhost:4000', 'http://localhost:4200'];
  const corsOtions = {
      credentials: true,
      origin: function(origin, callback) {
          if(whitelist.indexOf(origin) !== -1) {
              callback(null, true)
          } else {
              callback(new Error('Not allowed by CORS'))
          }
      }
  };
 server.set("secretKey", "moneHeistApi");
  
// Para usar POSTMAN. instalar la dependencia cors npm install --save cors, corsOtions    
server.use(cors());
// Parsea Post y Put que vienen como JSON.
server.use(express.json());
// Parsea Post y Put que vienen como STRING o ARRAY.
server.use(express.urlencoded({ extended: false }));

// Ruta para subir archivos estaticos, con express.static.
// Archivos estaticos son los que no cambián, ejemplo iamgenes.
// Requerimos path, que ya es ta en nodeJS __diarne enlaza con express.static y la carpeta plubic.
server.use(express.static(path.join(__dirname, 'public')));

// Iniciar y confi de passport y lo ejecuta.
require('./utils/authentication/passport.js');

// Añadimos mongoStore para que nos guarde la sesiones en mongodb si el servidor no esta levantado.
server.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 600000
    },
    store: MongoStore.create({
        mongoUrl: DB_URL
    })

}));

// Inciar passport.
server.use(passport.initialize());
// Para utilizar la sesión passport.
server.use(passport.session());

// Mensage para la ruta vacia de vercel.
server.get('/', (req,res) => {
    res.json("Bienvenido a mi API Jonatan!");
});

server.use('/user', userRouter);
server.use('/movies', moviesRoutes);
server.use('/cinemas', cinemasRoutes);
server.use('/userdata', userDataRoutes);
server.use('/plates', platesRoutes);
server.use('/diets', dietsRoutes);

// Control de errores.
server.use((err, req, res, next) => {
    return res.status(err.status || 500).json(err.message || 'Unexpected error');
});


server.listen(PORT, () => {
    console.log(`El servidor está escuchando en http://localhost:${PORT}`);
})


// Tenemso que exportar el servidor.
module.exports = server;