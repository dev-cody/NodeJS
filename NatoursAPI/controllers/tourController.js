const fs = require('fs')

//Reading the json file to get all tours
const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))

exports.getAllTours = (req,res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours
        }
    })
}

exports.createTour = (req, res) => {
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

exports.getTour = (req,res) => {
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

exports.updateTour = (req, res) => {
    
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