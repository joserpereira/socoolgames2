const mongoose = require('mongoose');

const modelSchema = mongoose.Schema(
    {
        templateName: {
            type: String,
            required: true
        },
        configName: {
            type: String,
            required: true
        },
        emailSubject: {
            type: Object,
            default: ""
        },
        emailContent: {
            type: Object,
            default: ""
        },
        showDownloadlink: {
            type: Boolean,
            default: false
        },
    },
    {
        strict: false,
        timestamps: true
    }
)


const model = mongoose.model('EmailTemplate', modelSchema);

module.exports = model;