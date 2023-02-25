const { json } = require('express');
const express = require('express');
const passport = require('passport');
const User = require('../models/Users.js');
const bcrypt = require('bcrypt');
const getJWT = require('../utils/authentication/jsonwebtoken');
const createError = require('../utils/errors/create-error.js');

const userRouter = express.Router();

// Creación de autentificación.
userRouter.post('/register', (req, res, next) => {
    const done = (err, user) => {
        if(err) {
            return next(err);
        }
        req.logIn(
            user,
            (err) => {
                if (err) {
                    return next(err);
                }
                return res.status(201).json(user);
            }

        );
    };
    passport.authenticate('register', done)(req);
});

// Para el login.
userRouter.post('/login', (req, res, next) => {

    const done = (err, user) => {
        if (err) {
            return next(err);
        }
      
        req.logIn(
            user,
            (err) => {
                if (err) {
                    return next(err);
                }
                return res.status(200).json(user);
            }
        );
    };

    passport.authenticate('login', done)(req);
});

// terminar sesión.
userRouter.post('/logout', (req, res, next) => {
    if(req.user){
        req.logOut(() =>{
            req.session.destroy(() => {
                res.clearCookie('connect.sid');
                return res.status(200).json('Hasta luego');
            });
        });
    } else {
        return res.status(304),json('No hay usuarios logueados en este momento');
    }
});

// Traer todos los usuarios 
userRouter.get('/all-user', async (req, res, next) => {
    try{
        const email = req.query.email;
       const user = await User.find(email);
       return res.status(200).json(user);
    }catch(err) {
       next(err);
    }
});

userRouter.get('/Search/:id', async (req, res, next) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (user) {
            return res.status(200).json(user);
        } else {
            next(createError('No existe el usuario con el id indicado', 404));
        }
    } catch (err) {
        // Next nos permite pasar al siguiente paso dentro del flujo de nuestro servidor
        next(err);
    }
 });


// Post con WebToken
 userRouter.post('/login-jwt', async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email })
    if(!user) {
        return next(createError('El usuario no existe'), 404);
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword) {
        return next(createError('La contraseña no es valida', 403));
    }

    user.password = null;
    const token = getJWT(user, req.app.get('secretKey'));
    return res.status(200).json({
        user,
        token
    })
 });

module.exports = userRouter;