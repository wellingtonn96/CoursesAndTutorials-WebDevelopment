const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/noderest', { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
mongoose.Promise = global.Promise

module.exports = mongoose