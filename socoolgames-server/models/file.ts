const mongoose = require('mongoose');

const modelSchema = mongoose.Schema(
    {
        original: {
            type: String
        },
        name: {
            type: String
        }
    },
    {
        strict: false,
        timestamps: true,
    }
)


const model = mongoose.model('file', modelSchema);

module.exports = model;