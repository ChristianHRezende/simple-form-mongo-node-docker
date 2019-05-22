const express = require('express')
const restful = require('node-restful')
const mongoose = restful.mongoose
const bodyParser = require('body-parser')
const cors = require('cors')
//Database 
mongoose.connect('mongodb://db/mydb')

const server = express()

//Middleware
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use(cors())

//ODM
const Client = restful.model('Client', {
    name: { type: String, required: true }
})

//Rest API

Client.methods(['get', 'post', 'put', 'delete'])
Client.updateOptions({ new: true, runValidators: true })

//Routes
Client.register(server, '/clients')

//Start sever
server.listen(3000)
