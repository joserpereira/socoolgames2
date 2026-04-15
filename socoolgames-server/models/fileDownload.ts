const mongoose = require('mongoose');

const modelSchema = mongoose.Schema(
    {
        email: {
            type: String
        },
        emailTemplate: {
            type: String
        }        
    },
    {
        strict: false,
        timestamps: true,
    }
)


const model = mongoose.model('filedownload', modelSchema);

module.exports = model;