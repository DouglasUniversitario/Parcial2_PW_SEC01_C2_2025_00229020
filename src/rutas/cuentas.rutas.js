const express = require('express');
const router = express.Router();
const controlador = require('../controladores/cuentas.controlador');

router.get('/cuentas', controlador.obtenerTodas);
router.get('/cuenta/:id', controlador.obtenerPorId);
router.get('/cuentasBalance', controlador.obtenerBalance);

module.exports = router;
