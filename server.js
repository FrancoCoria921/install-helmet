'use strict';
// require('dotenv').config(); // Comentada para evitar errores de despliegue en entornos sin .env
const express     = require('express');
const bodyParser  = require('body-parser');
const fccTesting  = require('./freeCodeCamp/fcctesting.js');
const app         = express();

// Requerir la librería BCrypt: Esencial para la Prueba 2.
const bcrypt = require('bcrypt');

fccTesting(app);

// Variables de prueba (NO REMOVER)
const saltRounds = 12;
const myPlaintextPassword = 'sUperpassw0rd!';
const someOtherPlaintextPassword = 'pass123';


//START_ASYNC -do not remove notes, place code between correct pair of notes.
// Implementación Asíncrona: Hashing y Comparación (Método preferido)

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    if (err) {
        console.error("Async Error Hashing:", err);
        return;
    }
    
    console.log("-----------------------------------------");
    console.log("ASYNC: Hash generado:", hash);

    // Comparación asíncrona (contraseña correcta)
    bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
        if (err) return console.error("Async Compare Error (Correcta):", err);
        console.log("ASYNC: Comparación correcta (debe ser true):", result);

        // Comparación asíncrona (contraseña incorrecta)
        bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
            if (err) return console.error("Async Compare Error (Incorrecta):", err);
            console.log("ASYNC: Comparación incorrecta (debe ser false):", result);
            console.log("-----------------------------------------");
        });
    });
});
//END_ASYNC

//START_SYNC
// Implementación Síncrona: Hashing y Comparación (Bloquea el hilo, usar con precaución)

try {
    // 1. Generar Hash Síncronamente
    const hashSync = bcrypt.hashSync(myPlaintextPassword, saltRounds);
    console.log("SYNC: Hash generado:", hashSync);

    // 2. Comparar Síncronamente (contraseña correcta)
    const syncMatchCorrect = bcrypt.compareSync(myPlaintextPassword, hashSync);
    console.log("SYNC: Comparación correcta (debe ser true):", syncMatchCorrect);

    // 3. Comparar Síncronamente (contraseña incorrecta)
    const syncMatchIncorrect = bcrypt.compareSync(someOtherPlaintextPassword, hashSync);
    console.log("SYNC: Comparación incorrecta (debe ser false):", syncMatchIncorrect);
    console.log("-----------------------------------------");
} catch (error) {
    console.error("SYNC Error:", error);
}

//END_SYNC





























const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port:", PORT)
});
