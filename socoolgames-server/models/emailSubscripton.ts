const mongoose = require('mongoose');

/*

    State
    0: Created,
    1: Page Visited,
    2: File Downloaded

*/

const modelSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Please enter a page name"]
        },
        language: {
            type: String
        },
        isActive: {
            type: Boolean,
            default: true
        },
        unsubscriptionDate: {
            type: Date
        },
        pageId: {
            type: String,
        },
        type: {
            type: String,
        },
        emailConfigName : {
            type: String 
        },
        state : {
            type: Number,
            default: 0
        },
        pageVisitedDate: {
            type: Date
        },
        fileDowloadedDate: {
            type: Date
        },
    },
    {
        timestamps: true
    })

const model = mongoose.model('EmailSubscripton', modelSchema);


module.exports = model;