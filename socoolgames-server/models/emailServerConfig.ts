const mongoose = require('mongoose');

const modelSchema = mongoose.Schema(
    {
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
        emailName: {
            type: Object,
            default: ""
        },
        emailFrom: {
            type: String,
            default: ""
        },
        emailType: {
            type: String,
            default: ""
        },
        emailUsername: {
            type: String,
            default: ""
        },
        emailPass: {
            type: String,
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


const model = mongoose.model('EmailServerConfig', modelSchema);

module.exports = model;