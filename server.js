const express = require('express')

const path = require('path')

const recipeRouter = require('./recipeApi/api')

const {SERVER_PORT} = require('./config/config')


const app = express()

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname,'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')))

app.use('/ricepes',recipeRouter)

app.listen(SERVER_PORT, function (){
    console.log(`server is running at port ${SERVER_PORT}`);
})