const mongoose = require('mongoose');

const modelSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"]
        },
        email: {
            type: String,
            required:  [true, "Please enter your email"]
        },   
        password: {
            type: String
        },
        active: {
            type: Boolean,
            default: true
        },
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Role"
            }
        ]
    },
    {
        strict: false,
        timestamps: true,
    }
)

const model = mongoose.model('User', modelSchema);

module.exports = model;