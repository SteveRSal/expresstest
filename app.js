const { json } = require('body-parser');
const express = require('express');
const app = express(); 

const {infoServicios} = require('./servicios');

console.log(infoServicios);

//routing 

app.get('/', (req, res) => {
    res.send('Servidor de Servicios con Express');
});

app.get('/api/servicios', (req, res) => {
    res.send(JSON.stringify(infoServicios)); 
}); 

app.get('/api/servicios/telecomunicaciones', (req, res) => {
    res.send(JSON.stringify(infoServicios.telecomunicaciones)); 
});

app.get('/api/servicios/datacenter', (req, res) => {
    res.send(JSON.stringify(infoServicios.datacenter));
});

app.get('/api/servicios/telecomunicaciones/:trabajo', (req, res) => {
    const trabajo = req.params.trabajo; 
    const resultados = infoServicios.telecomunicaciones.filter(servicio => servicio.trabajo === trabajo);
    if (resultados.length === 0){
        return res.status(404).send(`No se encontraron servicios de ${trabajo}`);
    }

    res.send(JSON.stringify(resultados))
});

app.get('/api/servicios/datacenter/:trabajo', (req, res) => {
    const trabajo = req.params.trabajo; 
    const resultados = infoServicios.datacenter.filter(servicio => servicio.trabajo === trabajo);
    if (resultados.length === 0){
        return res.status(404).send(`No se encontraron servicios de ${trabajo}`);
    }

    res.send(JSON.stringify(resultados))
});

const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
    console.log(`El Servidor esta escuchando en el puerto: ${PUERTO}...`)
}); 
