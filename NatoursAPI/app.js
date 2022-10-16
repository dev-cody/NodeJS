const fs = require('fs')
const express = require('express')
const morgan = require('morgan')

const app = express()
app.use(express.json())

app.use(morgan('dev'))

app.use((req, res, next) => {
    console.log(`hello from the middlewares, bitches`)
    next()
})

//Reading the json file to get all tours
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

const getAllTours = (req,res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
}

const createTour = (req, res) => {
    // console.log(req.body)
    //Create a new ID based on the last Id that is in the json file
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({id: newId}, req.body)

    tours.push(newTour)

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    })
}

const getTour = (req,res) => {
    //This will convert the string into a number
    const id = req.params.id * 1

    if(id > tours.length) {
        return res.status(404).json({
            status: 'Failed',
            message: 'invalided ID'
        })
    }

    const tour = tours.find(el => el.id === id)

    res.status(200).json({
        status: 'success',
        data: {
            tour
        }
    })
}

const updateTour = (req, res) => {
    
    if(req.params.id * 1 > tours.length) {
        return res.status(400).json({
            status: 'failed',
            message: 'Invalid ID'
        })
    }
    
    res.status(200).json({
        status: 'success',
        data: {
            tour: 'Tour updated'
        }
    })
}

const getAllUsers = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet setup'
    })
}

const getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet setup'
    })
}
const createUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet setup'
    })
}

const updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet setup'
    })
}

const deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'This route is not yet setup'
    })
}


const tourRouter = express.Router()
const userRouter = express.Router()

// *tour routes
tourRouter.route('/')
    .get(getAllTours)
    .post(createTour)

tourRouter.route('/:id')
    .get(getTour)
    .patch(updateTour)

// *users routes
userRouter.route('/')
    .get(getAllUsers)
    .post(createUser)

userRouter.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

//Port that the server will run on
const port = 3000
app.listen(port, () => {
    console.log(`listening on port ${port}...`)
})

