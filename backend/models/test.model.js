const mongoose = require('mongoose');const Test = mongoose.model('Test', {
    name: {
        type: String,
        required: true
    },
    testerId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    userId: { //email
        type: String,
        required: true
    },
    patientType: {
        type: String,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: false
    }
   

});

module.exports = Test;
