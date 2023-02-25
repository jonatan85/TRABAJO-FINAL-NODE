const mongoose = require('mongoose');
const Diet = require('../../models/Diets.js');
const fs = require('fs');

const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    const allDiets = await Diet.find();

    if (allDiets.length) {
        // Elimina todo el contenido de la colección
        await Diet.collection.drop();
    }
}).catch(err => {
    console.log(`Ha habido un error eliminando los datos: ${err}`);
})


.then(async () => {
    // Añadir los nuevos elementos a nuestra colección.
    const data = fs.readFileSync('./utils/seeds/db/diets.json');
    const parsedData = JSON.parse(data);
    const dietsDocs = parsedData.map((diet) => {
        return new Diet(diet);
    });
    await Diet.insertMany(dietsDocs);
})
.catch((err) => {
    console.log(`Ha habido un error añadiendo los elementos a la base de datos: ${err}`);
})
// mongoose.disconnect --> desconecta la conexión actual a la base de datos.
.finally(() => mongoose.disconnect());
