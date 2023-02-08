const express = require('express');

const {datacenter} = require('../datos/servicios').infoServicios;

const routerDataCenter = express.Router();

routerDataCenter.get('/', (req, res) => {
    res.send(JSON.stringify(datacenter));
});



routerDataCenter.get('/:trabajo', (req, res) => {
    const trabajo = req.params.trabajo; 
    const resultados = datacenter.filter(servicio => servicio.trabajo === trabajo);
    if (resultados.length === 0){
        return res.status(404).send(`No se encontraron servicios de ${trabajo}`);
    }
    if (req.query.ordenar === 'vistas') {
        return res.send(JSON.stringify(resultados.sort((a, b) => b.vistas- a.vistas)))
    }

    res.send(JSON.stringify(resultados))
});

routerDataCenter.get('/:trabajo/:nivel', (req, res) => {
    const trabajo = req.params.trabajo;
    const nivel = req.params.nivel; 
    const resultados = datacenter.filter(servicio => servicio.trabajo === trabajo && servicio.nivel === nivel);
    if (resultados.length === 0){
        return res.status(404).send(`No se encontraron servicios de ${trabajo} de nivel ${nivel}`);
    }

    res.send(JSON.stringify(resultados))
});

module.exports = routerDataCenter;