const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    travelerID: {
        type: String,
        required: true
    },
    agentID: {
        type: String,
        required: true
    },
    tripCode: {
        type: String,
        required: true
    }
});

const Booking = mongoose.model('bookings', bookingSchema);

module.exports = Booking;