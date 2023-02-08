const { json } = require('body-parser');
const express = require('express');
const app = express(); 

const {infoServicios} = require('./servicios');

console.log(infoServicios);

//Routers

const routerTelecomunicaciones = express.Router();
app.use('/api/servicios/telecomunicaciones', routerTelecomunicaciones);

const routerDataCenter = express.Router();
app.use('/api/servicios/datacenter', routerDataCenter);

//routing 

app.get('/', (req, res) => {
    res.send('Servidor de Servicios con Express');
});

app.get('/api/servicios', (req, res) => {
    res.send(JSON.stringify(infoServicios)); 
}); 

//telecomunicaciones

routerTelecomunicaciones.get('/', (req, res) => {
    res.send(JSON.stringify(infoServicios.telecomunicaciones)); 
});

routerTelecomunicaciones.get('/:trabajo', (req, res) => {
    const trabajo = req.params.trabajo; 
    const resultados = infoServicios.telecomunicaciones.filter(servicio => servicio.trabajo === trabajo);
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
    const resultados = infoServicios.telecomunicaciones.filter(servicio => servicio.trabajo === trabajo && servicio.nivel === nivel);
    if (resultados.length === 0){
        return res.status(404).send(`No se encontraron servicios de ${trabajo} de nivel ${nivel}`);
    }

    res.send(JSON.stringify(resultados))
});

//datacenter

routerDataCenter.get('/', (req, res) => {
    res.send(JSON.stringify(infoServicios.datacenter));
});



routerDataCenter.get('/:trabajo', (req, res) => {
    const trabajo = req.params.trabajo; 
    const resultados = infoServicios.datacenter.filter(servicio => servicio.trabajo === trabajo);
    if (resultados.length === 0){
        return res.status(404).send(`No se encontraron servicios de ${trabajo}`);
    }

    res.send(JSON.stringify(resultados))
});

routerDataCenter.get('/:trabajo/:nivel', (req, res) => {
    const trabajo = req.params.trabajo;
    const nivel = req.params.nivel; 
    const resultados = infoServicios.datacenter.filter(servicio => servicio.trabajo === trabajo && servicio.nivel === nivel);
    if (resultados.length === 0){
        return res.status(404).send(`No se encontraron servicios de ${trabajo} de nivel ${nivel}`);
    }

    res.send(JSON.stringify(resultados))
});

//Conexión 

const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
    console.log(`El Servidor esta escuchando en el puerto: ${PUERTO}...`)
}); 
