/**
 * Este archivo contiene la configuración inicial para el proyecto de seguridad con Node.js y Express.
 * No modifiques ni elimines el código existente.
 * * Agrega tu código de BCrypt a continuación.
 */

'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const fccTesting = require('./freeCodeCamp/fcctesting.js');
const session = require('express-session');
const passport = require('passport');

// **********************************************
// PASO 1: Requerir la librería BCrypt
// **********************************************
const bcrypt = require('bcrypt');

const app = express();

fccTesting(app); // For testing purposes

// Configuración de Express y Session
app.set('view engine', 'pug');
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Configuración de Passport
app.use(passport.initialize());
app.use(passport.session());

app.route('/').get((req, res) => {
  res.render(process.cwd() + '/views/pug/index', { title: 'Hello', message: 'Please login' });
});

// **********************************************
// PASO 2: Implementación de BCrypt
// 
// Vamos a simular el registro de un usuario.
// Normalmente, este código se ejecutaría en la ruta de registro (/register).
// 
// El "costo" (rounds) de BCrypt se define en el método genSalt. 
// Para el desarrollo y las pruebas, un costo de 10 es común.
// Un costo de 12 es el recomendado para producción.
// **********************************************

// Datos de ejemplo
const plainTextPassword = 'mysecretpassword123';
const saltRounds = 12; // Define el costo de procesamiento (2^12 iteraciones)

console.log(`\n--- Probando BCrypt ---`);
console.log(`Contraseña original: ${plainTextPassword}`);
console.log(`Costo del hash (saltRounds): ${saltRounds}`);

// 1. Generar la sal (salt) y hashear la contraseña
bcrypt.hash(plainTextPassword, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error al hashear la contraseña:', err);
    return;
  }

  // El 'hash' resultante incluye el prefijo ($2a$), el costo ($12$), 
  // la sal en texto plano (22 caracteres) y la contraseña hasheada.
  console.log(`\nHash Generado: ${hash}`);

  // 2. Verificar la contraseña
  // Esto simula lo que ocurre cuando un usuario inicia sesión.
  bcrypt.compare(plainTextPassword, hash, (err, result) => {
    if (err) {
      console.error('Error al comparar la contraseña:', err);
      return;
    }

    if (result) {
      console.log('Verificación exitosa: La contraseña coincide con el hash.');
    } else {
      console.log('Verificación fallida: La contraseña NO coincide.');
    }
  });
  
  // 3. Probar con una contraseña incorrecta
  const wrongPassword = 'wrongpassword';
  bcrypt.compare(wrongPassword, hash, (err, result) => {
    if (result) {
      console.log('¡ERROR! La contraseña incorrecta fue aceptada.');
    } else {
      console.log('Prueba con contraseña incorrecta: Fallida correctamente.');
    }
  });
});

// **********************************************
// Fin de la implementación de BCrypt
// **********************************************

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on port " + PORT);
});

