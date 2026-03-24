const mongoose = require('mongoose');

const emailServerConfigSchema = mongoose.Schema(
    {
        configName: {
            type: String,
            required: true
        },
        emailSubject: {
            type: String,
            default: ""
        },
        emailContent: {
            type: String,
            default: ""
        },
        emailName: {
            type: String,
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


const EmailServerConfig = mongoose.model('EmailServerConfig', emailServerConfigSchema);

module.exports = EmailServerConfig;