const express = require('express');

const {telecomunicaciones} = require('../datos/servicios').infoServicios;

const routerTelecomunicaciones = express.Router();

routerTelecomunicaciones.get('/', (req, res) => {
    res.send(JSON.stringify(telecomunicaciones)); 
});

routerTelecomunicaciones.get('/:trabajo', (req, res) => {
    const trabajo = req.params.trabajo; 
    const resultados = telecomunicaciones.filter(servicio => servicio.trabajo === trabajo);
    if (resultados.length === 0){
        return res.status(404).send(`No se encontraron servicios de ${trabajo}`);
    }
    if (req.query.ordenar === 'vistas') {
        return res.send(JSON.stringify(resultados.sort((a, b) => b.vistas- a.vistas)))
    }

    res.send(JSON.stringify(resultados))
});

routerTelecomunicaciones.get('/:trabajo/:nivel', (req, res) => {
    const trabajo = req.params.trabajo;
    const nivel = req.params.nivel; 
    const resultados = telecomunicaciones.filter(servicio => servicio.trabajo === trabajo && servicio.nivel === nivel);
    if (resultados.length === 0){
        return res.status(404).send(`No se encontraron servicios de ${trabajo} de nivel ${nivel}`);
    }

    res.send(JSON.stringify(resultados))
});

routerTelecomunicaciones.post('/', (req, res) => {
    let servicioNuevo = req.body;
    telecomunicaciones.push(servicioNuevo);
    res.send(JSON.stringify(telecomunicaciones));
});

module.exports = routerTelecomunicaciones;