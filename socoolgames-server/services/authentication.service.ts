import { Logger } from '../utils/loggerUtils';
import { LoginModel } from '../models/login';
import { sign, verify } from 'jsonwebtoken';
const UserModel = require('../models/user')

const bcrypt = require('bcryptjs');
const loggerUtils = new Logger();
const diffInMinutes = (date1: any, date2: any) => {
  const diffMs = Math.abs(date2 - date1); // diferença em ms
  return Math.floor(diffMs / (1000 * 60));
}

const login = async (email: string, password: string, ipInfo: any) => {
    let result = { error: 0, message: '', data: {} };
    if (!email || !password) {
        loggerUtils.log("login: No Access Token");
        result.error = 400;
        result.message = 'Email and password are required';
    }

    const user = await UserModel.findOne({ email });
    if (!user) { 
        loggerUtils.log("login: User not found, " + email)
        result.error = 404;
        result.message = 'Invalid Credentials';
    }

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    
    const failedResult = await LoginModel.aggregate([
        {
            $match: {
                email: email,
                createdAt: { $gt: oneHourAgo },      
                errorCode: { $ne: 0 }      
            }
        },
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                latestCreatedAt: { $min: "$createdAt" }
            }
        }
    ]);

    if (failedResult !== undefined && failedResult.length > 0 && failedResult[0].total > 3) { 
        loggerUtils.log("login: User not found, " + email)
        const now = Date.now();
        var diff = diffInMinutes(failedResult[0].latestCreatedAt, now) + 1;
        result.error = 404;
        result.message = 'User Block. Please try again';
        result.data = { message: "Retry after " + diff.toString() + " minute" + (diff > 1 ? "s": "") + "." };
    }
    else {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            loggerUtils.log("login: Invalid Credentials, " + email)
            result.error = 404;
            result.message = 'Invalid Credentials';
        }
    }

    if (result.error !== 0) {
        registerLoginActivity(email, "", ipInfo, result.error, result.message);
        return result;
    }
    const { password: _, ...newUser } = user._doc;
    registerLoginActivity(email, newUser._id, ipInfo, result.error, result.message);

    // Generate tokens
    const accessToken = sign({ userId: newUser._id, email }, process.env.ACCESS_TOKEN_SECRET || "", { expiresIn: '15m' });
    const refreshToken = sign({ userId: newUser._id, email }, process.env.REFRESH_TOKEN_SECRET || "", { expiresIn: '1d' });
    //const accessToken = sign({ userId: newUser._id, email }, process.env.ACCESS_TOKEN_SECRET || "", { expiresIn: '1m' });
    //const refreshToken = sign({ userId: newUser._id, email }, process.env.REFRESH_TOKEN_SECRET || "", { expiresIn: '1m' });
    
    return { error: 0, message: "Login successful", user: newUser, accessToken, refreshToken };
}

const registerLoginActivity = async (email: string, userId: string, ipInfo: any, errorCode: number, errorMessage: string) => {
    try {
        // You can implement logging of login activity here
        loggerUtils.log(`User ${userId} logged in from IP info: ${JSON.stringify(ipInfo)}`);
        const loginRecord = new LoginModel({
            email,
            userId,
            ipInfo,
            errorCode,
            errorMessage
        });
        await loginRecord.save();
    } catch (error: any) {
        loggerUtils.error("Error logging login activity: " + error.message);
    }
}
const exportedFunctions = {
    login
};
module.exports = exportedFunctions;