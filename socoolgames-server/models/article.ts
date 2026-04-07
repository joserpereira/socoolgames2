import { title } from "node:process";

const mongoose = require('mongoose');

const modelSchema = mongoose.Schema(
    {
        header: {
            type: Object,
            required: false
        },
        title: {
            type: Object,
            required:  [true, "Please enter article title"]
        },   
        content: {
            type: Object,
            required:  [true, "Please enter article content"]
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

const model = mongoose.model('Article', modelSchema);

module.exports = model;