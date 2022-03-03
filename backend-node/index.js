'use strict';
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes/routes');
// const jwt = require('jsonwebtoken')
const Endpoint = express();

Endpoint.use(express.json());
Endpoint.use(cors());
Endpoint.use(bodyParser.json());

Endpoint.use('/api', routes.routes);
Endpoint.get('/',(req, res)=>{
    res.status(200).json({message:"Success"})
})


Endpoint.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));