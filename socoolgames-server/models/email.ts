const mongoose = require('mongoose');

const modelSchema = mongoose.Schema(
    {
        fromEmail: {
            type: String
        },
        toEmail: {
            type: String
        },
        toName: {
            type: String
        },
        subject: {
            type: String
        },
        content: {
            type: String
        },
        serverUsername: {
            type: String
        },
        externalId: {
            type: String,
            default:  ""
        },
        externalType: {
            type: String,
            default:  ""
        },
        status: {
            type: String,
            default:  ""
        },
        serverResponse: {
            type: String,
            default:  ""
        }
    },
    {
        strict: false,
        timestamps: true,
    }
)


const model = mongoose.model('emails_sent', modelSchema);

module.exports = model;