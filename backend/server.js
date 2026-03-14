const express = require('express');
const { auth } = require('express-oauth2-jwt-bearer');
const app = express();

// Middleware de validación de Keycloak (JWT Bearer)
// Keycloak envía aud: "account" en tokens del flujo Authorization Code
const checkJwt = auth({
  audience: 'account',
  issuerBaseURL: 'http://localhost:8080/realms/LaboratorioDev',
  tokenSigningAlg: 'RS256',
});

// Ruta pública (sin autenticación)
app.get('/api/publico', (req, res) => {
  res.json({ mensaje: 'Este contenido es libre.' });
});

// RUTA PROTEGIDA (requiere token JWT válido de Keycloak)
app.get('/api/privado', checkJwt, (req, res) => {
  res.json({
    mensaje: 'Acceso concedido',
    usuario: 'Token validado correctamente por Keycloak',
  });
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));
