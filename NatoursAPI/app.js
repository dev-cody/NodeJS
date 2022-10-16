const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()
app.use(express.json())
app.use(morgan('dev'))

//Routes
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

//Start the server
const port = 3000
app.listen(port, () => {
    console.log(`listening on port ${port}...`)
})