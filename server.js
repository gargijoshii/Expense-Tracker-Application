const express = require('express');
const dbConnect = require('./dbConnect');
const app = express()
const port = 5000
app.use(express.json())
const transactionsRoute = require('./routes/transactionsRoute')

const userRoute = require('./routes/usersRoutes')
app.use('/api/transactions', transactionsRoute)

app.use('/api/users', userRoute)
app.listen(port, () => console.log(`Node JS Server started at port ${port}!`));