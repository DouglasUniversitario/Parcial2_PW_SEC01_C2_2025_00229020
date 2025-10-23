const express = require('express');

const app = express();

const rutasCuentas = require('./src/rutas/cuentas.rutas');

const PUERTO = 3130;

app.use(express.json());

app.use('/', rutasCuentas);

app.get('/', (req, res) => {
    res.send('Api de cuentas funcionando en el puerto ' + PUERTO);
});

app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
