const http = require('http');

const express = require('express')

const app = express()

app.use((req, res, next) => {
    console.log('In the meddleware')
    next() // allows the request to continue to the next middleware in line
})

app.use((req, res) => {
    console.log('In another middleware!')
    res.send('<h1>Hello from Express!</h1>')
})

const server = http.createServer(app)

server.listen(3000, () => {
    console.log('Web server running on port 3000')
})