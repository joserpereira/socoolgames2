const mongoose = require('mongoose');

const modelSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        items: {
            type: Array<Object>
        }
    },
    {
        strict: false,
        timestamps: true
    }
)


const model = mongoose.model('Menus', modelSchema);

module.exports = model;