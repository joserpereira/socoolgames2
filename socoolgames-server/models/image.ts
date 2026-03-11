const mongoose = require('mongoose');

const modelSchema = mongoose.Schema(
    {
        original: {
            type: String
        },
        thumb: {
            type: String
        },
        medium: {
            type: String
        },
        large: {
            type: String
        }
    },
    {
        strict: false,
        timestamps: true,
    }
)


const model = mongoose.model('image', modelSchema);

module.exports = model;