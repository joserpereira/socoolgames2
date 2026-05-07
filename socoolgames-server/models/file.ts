const mongoose = require('mongoose');

const modelSchema = mongoose.Schema(
    {
        original: {
            type: String
        },
        name: {
            type: String
        },
        downloadCount: {
            type: Number,
            default: 0  
        }
    },
    {
        strict: false,
        timestamps: true,
    }
)


const model = mongoose.model('file', modelSchema);

module.exports = model;