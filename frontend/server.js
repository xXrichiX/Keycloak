const express = require('express');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(express.static(path.join(__dirname, 'public')));
// Keycloak JS desde node_modules (evita fallos del CDN)
app.use('/vendor/keycloak.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'node_modules', 'keycloak-js', 'dist', 'keycloak.min.js'), {
    headers: { 'Content-Type': 'application/javascript' }
  });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Landing disponible en http://localhost:${PORT}`);
});
