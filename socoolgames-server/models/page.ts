const mongoose = require('mongoose');

const modelSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter page name"]
        },
        slug: {
            type: String,
            required:  [true, "Please enter slug"]
        },   
        active: {
            type: Boolean,
            default: true
        }
    },
    {
        strict: false,
        timestamps: true,
    }
)

const model = mongoose.model('Page', modelSchema);

module.exports = model;