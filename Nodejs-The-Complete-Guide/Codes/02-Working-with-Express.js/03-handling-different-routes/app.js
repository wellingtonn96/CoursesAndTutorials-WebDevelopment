const express = require('express')

const app = express()

app.use('/', (req, res, next) => {
    console.log('This aways runs!')
    next() // allows the request to continue to the next middleware in line
})

app.use('/add-product', (req, res, next) => {
    console.log('In another middleware!')
    res.send('<h1>The "Add Product" Page</h1>')
})

app.use('/', (req, res, next) => {
    console.log('In another middleware')
    res.send('<h1>Hello from Express!</h1>')
})

app.listen(3000, () => {
    console.log('Web server running on port 3000')
})