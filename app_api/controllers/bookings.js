const mongoose = require('mongoose');
const Booking = require("../models/booking"); 
const User = mongoose.model('users'); 

const getUser = (req, res, callback) => {
    if (req.auth && req.auth.email) {
        User.findOne({ email : req.auth.email })
        .then((user) => {
            if (!user) {
                res.status(404).json({"message": "User not found"});
            }

            callback(req, res, user.name, user.membershipID); 
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

// GET: /bookings - Gets a list of Bookings
// Return all Bookings for an Agent or Traveler
const bookingsGetBookings = async (req, res) => {
    getUser(req, res,
        (req, res, user) => {
            Booking
            .find({ 
                membershipID: user.membershipID
            })
            .then(bookings => {
                return res
                .status(200) // found
                .json(bookings);
            })
            .catch((err) => {
                return res
                .status(400) // bad request
                .json(err);
            });
        }
    )
}

// POST: /bookings - Adds a new Booking
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const bookingsAddBooking = async (req, res) => {
    getUser(req, res,
        (req, res) => {
            Booking
            .create({
                tripCode: req.body.tripCode,
                travelerID: req.body.travelerID,
                agentID: req.body.agentID
            })
            .then((booking) => {
                return res
                .status(201) // created
                .json(booking);
            })
            .catch((err) => {
                return res
                .status(400) // bad request
                .json(err);
            });
        }
    );
}

module.exports = {
    bookingsAddBooking,
    bookingsGetBookings
};