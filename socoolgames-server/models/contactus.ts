const mongoose = require('mongoose');

const contactUsSchema = mongoose.Schema(
    {
        title: {
            type: String,
        },  
        email: {
            type: String,
            required: [true, "Please enter a email"]
        },    
        message: {
            type: String,
        },  
    },
    {
        timestamps: true
    })

const ConctacUs = mongoose.model('ContactUs', contactUsSchema);

module.exports = ConctacUs;