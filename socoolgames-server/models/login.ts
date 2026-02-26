const mongoose = require('mongoose');

const modelSchema = mongoose.Schema(
    {
        email: {
            type: String
        },
        userId: {
            type: String
        },
        ipInfo: {
            type: Object
        },
        errorCode: {
            type: Number
        },
        errorMessage: {
            type: String
        }
    },
    {
        strict: false,
        timestamps: true,
    }
)

export const LoginModel = mongoose.model('Login', modelSchema);