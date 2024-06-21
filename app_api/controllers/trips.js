const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // model
const Model = mongoose.model('trips');
const User = mongoose.model('users'); 

const getUser = (req, res, callback) => {
    if (req.auth && req.auth.email) {
        User.findOne({ email : req.auth.email })
        .then((user) => {
            if (!user) {
                res.status(404).json({"message": "User not found"});
            }

            callback(req, res, user.name); 
        })
        .catch((err) => {
            return res
            .status(400)
            .json(err);
        });
    }
    else {
        res
        .status(404)
        .json({"message": "Failure"});
    }
};

// GET: /trips - lists all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

        // Uncomment the following line to show results of query
        // on the console
        // console.log(q);
        
    if (!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
                .status(200)
                .json(q);
    }
};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) // Return single records
        .exec();

        // Uncomment the following line to show results of query
        // on the console
        // console.log(q);
        
    if (!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
                .status(200)
                .json(q);
    }
};

// GET: /trips/booked - list of trips found in bookings
const tripsListFiltered = async (req, res) => {
    try {
        // Extract tripCodes from query parameters
        const codes = Array.isArray(req.query.code) ? req.query.code : [req.query.code];

        // Check if tripCodes is an array and not empty
        if (!Array.isArray(codes) || codes.length === 0) {
            return res.status(400).json({ message: 'No codes provided' });
        }

        // Use codes to filter the trips
        const trips = await Model.find({
            'code': { $in: codes }
        }).exec();

        // Check if any trips were found
        if (!trips || trips.length === 0) {
            return res.status(404).json({ message: 'No trips found for the provided codes' });
        }

        // Return the filtered trips
        return res.status(200).json(trips);
    } catch (err) {
        // Handle any errors that occurred during the query
        return res.status(500).json({ message: 'An error occurred', error: err.message });
    }
};

// POST: /trips - Adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsAddTrip = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Trip
            .create({
                code: req.body.code,
                name: req.body.name,
                length: req.body.length,
                start: req.body.start,
                resort: req.body.resort,
                perPerson: req.body.perPerson,
                image: req.body.image,
                description: req.body.description
            })
            .then((trip) => {
                return res
                .status(201) // created
                .json(trip);
            })
            .catch((err) => {
                return res
                .status(400) // bad request
                .json(err);
            });
        }
    );
}     

// PUT: /trips/:tripCode - Updates a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, (req, res) => {
        Trip
        .findOneAndUpdate({'code': req.params.tripCode },{ 
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }, { new: true })
        .then(trip => {
            if (!trip) {
                return res
                .status(404)
                .send({
                    message: "Trip not found with code" + req.params.tripCode
                });
            }
            res.send(trip);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res
                .status(404)
                .send({
                    message: "Trip not found with code" + req.params.tripCode
                });
            }
            return res
            .status(500) // server error
            .json(err);
        });
    });
}

// DELETE: /trips/:tripCode - Deletes an existing Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsDeleteTrip = async (req, res) => {
    getUser(req, res, (req, res) => {
        Trip
        .findOneAndDelete({'code': req.params.tripCode })
        .then(trip => {
            if (!trip) {
                return res
                .status(404)
                .send({
                    message: "Trip not found with code" + req.params.tripCode
                });
            }
            res.send(trip);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res
                .status(404)
                .send({
                    message: "Trip not found with code" + req.params.tripCode
                });
            }
            return res
            .status(500) // server error
            .json(err);
        });
    });
}

module.exports = {
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    tripsDeleteTrip,
    tripsListFiltered
};