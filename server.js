'use strict';
// require('dotenv').config();
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const app         = express();

// Requerir la librería BCrypt
const bcrypt = require('bcrypt');

fccTesting(app);

// Variables de prueba (NO REMOVER)
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';


//START_ASYNC -do not remove notes, place code between correct pair of notes.
// Implementación Asíncrona: Hashing y Comparación

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    if (err) {
        console.error("Async Error Hashing:", err);
        return;
    }
    
    console.log("-----------------------------------------");
    console.log("ASYNC: Hash generated:", hash);

    // Comparación asíncrona (correcta)
    bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
        if (err) return console.error("Async Compare Error (Correct):", err);
        console.log("ASYNC: Correct comparison result (should be true):", result);

        // Comparación asíncrona (incorrecta)
        bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
            if (err) return console.error("Async Compare Error (Incorrect):", err);
            console.log("ASYNC: Incorrect comparison result (should be false):", result);
            console.log("-----------------------------------------");
        });
    });
});
//END_ASYNC

//START_SYNC
// Implementación Síncrona: Hashing y Comparación

// 1. Generar Hash Síncronamente
try {
    const hashSync = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    console.log("SYNC: Hash generated:", hashSync);

    // 2. Comparar Síncronamente (contraseña correcta)
    const syncMatchCorrect = bcrypt.compareSync(myPlaintextPassword, hashSync);
    console.log("SYNC: Correct comparison result (should be true):", syncMatchCorrect);

    // 3. Comparar Síncronamente (contraseña incorrecta)
    const syncMatchIncorrect = bcrypt.compareSync(someOtherPlaintextPassword, hashSync);
    console.log("SYNC: Incorrect comparison result (should be false):", syncMatchIncorrect);
    console.log("-----------------------------------------");
} catch (error) {
    console.error("SYNC Error:", error);
}

//END_SYNC





























const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
});
