'use strict';
require('dotenv').config(); // Agregado para el entorno de freeCodeCamp
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const app         = express();

// **********************************************
// PASO 1: Requerir la librería BCrypt
// **********************************************
const bcrypt = require('bcrypt');

fccTesting(app);

// Variables de prueba
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';


//START_ASYNC -do not remove notes, place code between correct pair of notes.

// 1. Hashing asíncrono
bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    if (err) {
        console.error("Error al hashear (Async):", err);
        return;
    }
    
    console.log("-----------------------------------------");
    console.log("ASYNC: Hash generado:", hash);

    // 2. Comparación asíncrona (contraseña correcta)
    bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
        if (err) return console.error("Error al comparar (Correcto - Async):", err);
        console.log("ASYNC: Comparación (Correcto) resulta:", result); // Debe ser true

        // 3. Comparación asíncrona (contraseña incorrecta)
        bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
            if (err) return console.error("Error al comparar (Incorrecto - Async):", err);
            console.log("ASYNC: Comparación (Incorrecto) resulta:", result); // Debe ser false
            console.log("-----------------------------------------");
        });
    });
});

//END_ASYNC

//START_SYNC

// 1. Hashing síncrono
const hashSync = bcrypt.hashSync(myPlaintextPassword, saltRounds);
console.log("SYNC: Hash generado:", hashSync);

// 2. Comparación síncrona (contraseña correcta)
const syncMatchCorrect = bcrypt.compareSync(myPlaintextPassword, hashSync);
console.log("SYNC: Comparación (Correcto) resulta:", syncMatchCorrect); // Debe ser true

// 3. Comparación síncrona (contraseña incorrecta)
const syncMatchIncorrect = bcrypt.compareSync(someOtherPlaintextPassword, hashSync);
console.log("SYNC: Comparación (Incorrecto) resulta:", syncMatchIncorrect); // Debe ser false
console.log("-----------------------------------------");

//END_SYNC


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT);
    console.log("Revisa la consola para ver los resultados de BCrypt.");
});
