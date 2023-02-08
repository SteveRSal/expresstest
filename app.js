const { json } = require('body-parser');
const express = require('express');
const app = express(); 

const {infoServicios} = require('./datos/servicios.js');

console.log(infoServicios);

//Routers

const routerTelecomunicaciones = require('./routers/telecomunicaciones.js');
app.use('/api/servicios/telecomunicaciones', routerTelecomunicaciones);

const routerDataCenter = require('./routers/datacenter.js');
app.use('/api/servicios/datacenter', routerDataCenter);

//routing 

app.get('/', (req, res) => {
    res.send('Servidor de Servicios con Express');
});

app.get('/api/servicios', (req, res) => {
    res.send(JSON.stringify(infoServicios)); 
}); 




//Conexión 

const PUERTO = process.env.PUERTO || 3000;

app.listen(PUERTO, () => {
    console.log(`El Servidor esta escuchando en el puerto: ${PUERTO}...`)
}); 


