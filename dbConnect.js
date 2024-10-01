const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Gargi:Gargi992003@cluster0.qs649ra.mongodb.net/spendwise', {useNewUrlParser: true, useUnifiedTopology: true})
const connection = mongoose.connection
connection.on('error', err => console.log(err))
connection.on('connected', () => console.log('Connected to MongoDB!'))

