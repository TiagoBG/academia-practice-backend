const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));

app.get('/', (req, res)=>{
    res.send('<h1>API Academia</h1>')
});

app.get('/estudiantes', (req, res)=>{
    let estudiantes = []
    estudiantes.push({nombre: 'Sarah', apellido: 'Renteria', edad:24})
    res.json(estudiantes)
});

app.listen(3000, ()=>{
    console.log('Server running at port 3000');
});