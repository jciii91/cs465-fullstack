const express = require('express'); // Express app
const router = express.Router();    // Router logic
const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload', 
    algorithms: ["HS256"]
});

// controllers
const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');
const bookingsController = require('../controllers/bookings');

// define routes for authentication
router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);

router
    .route('/register/agent')
    .post(authController.register);

router
    .route('/register/admin')
    .post(authController.register);

// define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(auth, tripsController.tripsAddTrip); // POST Method adds a Trip

// Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip)
    .delete(auth, tripsController.tripsDeleteTrip);

// define route for trips that have been booked
router
    .get('/booked-trips', tripsController.tripsListFiltered); // GET method returns list filtered by params

// define route for our bookings endpoint
router
    .route('/bookings')
    .get(auth, bookingsController.bookingsGetBookings)  // GET all Bookings for a User 
    .post(auth, bookingsController.bookingsAddBooking); // POST Method adds a Booking

module.exports = router;