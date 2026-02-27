import { Request, Response} from 'express';

import { verify } from 'jsonwebtoken';
import { Logger } from '../utils/loggerUtils';
import MailService from '../services/mail.service';

const UserModel = require('../models/user')
const authenticationService = require('../services/authentication.service')

const mailService = new MailService()
const loggerUtils = new Logger();
const bcrypt = require('bcryptjs');

export interface ICustomRequestBody {
    userDetails: {
      email: string,
      password: string
    };
  }

export const handleLogin = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { email, password, ipInfo  } = body;   
        
        const loginResult = await authenticationService.login(email, password, ipInfo);
        if (loginResult?.error == null) {
            loggerUtils.error("Login failed: Unknown error");
            return res.status(500).send({ message: 'Login failed' });
        }

        if (loginResult.error) {
            return res.status(loginResult.error).send({ message: loginResult.message, data: loginResult.data });
        }

        if (!loginResult.user || !loginResult.accessToken || !loginResult.refreshToken) {
            loggerUtils.error("Login failed: Incomplete login result");
            return res.status(500).send({ message: 'Login failed' });
        }
        res.cookie('access_token', loginResult.accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
        res.cookie('refresh_token', loginResult.refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

        // TODO: remover
        //res.cookie('access_token', loginResult.accessToken, { httpOnly: true, maxAge: 45 * 1000 });
        //res.cookie('refresh_token', loginResult.refreshToken, { httpOnly: true, maxAge: 1 * 60 * 1000 });


        res.status(200).send({ user: loginResult.user, "token": loginResult.accessToken, "roles": loginResult.roles  });
        loggerUtils.log("login: successfully, " + email)
    }
    catch (err: any) {
        loggerUtils.error("Login failed: " +  err.message);
        return res.status(401).send({ message: 'Login failed' });
    }   
}

export const handleAuthenticatedUser = async (req: Request, res: Response) => {
    try
    {
        if (!req.cookies || !req.cookies["access_token"]) {
            loggerUtils.log("Unauthenticated: No Access Token");
            return res.status(401).send({ message: 'No Access Token' });
        }

        const cookies = req.cookies["access_token"];
        const payload: any = verify(cookies, process.env.ACCESS_TOKEN_SECRET || "");
        if (!payload) {
            loggerUtils.log("Unauthenticated1: Unauthenticated Access Token: " + JSON.stringify(cookies));
            return res.status(401).send({ message: 'Unauthenticated Access Token' });
        }
        const user = await UserModel.findById(payload.userId);
        if (!user) {
            loggerUtils.log("Unauthenticated2: User not found");
            return res.status(404).send({ message: 'User not found' });
        }
        const { password: _, ...newUser } = user._doc;

        res.status(200).send({ user: newUser });
        loggerUtils.log("Authenticated user: " + newUser.email)
    }
    catch (err: any) {
        loggerUtils.error("Unauthenticated3: " +  err.message);
        return res.status(401).send({ message: 'Unauthenticated' });
    }   
};

export const handleRecoverPass = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { email  } = body;   

        if (!email) {
            loggerUtils.log("recover pass: Wrong paramenter");
            return res.status(400).send({ message: 'Email is required' });
        }

        const recover_code = crypto.randomUUID() //  uuidv4();
        const update = { recover_pass_code: recover_code, recover_pass_createdAt: new Date() }
        const user = await UserModel.findOneAndUpdate({ email }, update);

        if (!user) { 
            loggerUtils.log("recover pass: User not found, " + email)
            return res.status(404).send({ message: 'User not found' });
        }

        const emailBody = `Hello ${user.name},

We’ve received a request to reset your password.
To proceed, please click the link below:

<a href="${process.env.DASHBOARD_URL}/reset-password/${user.email}/${recover_code}">Set Password</a>

If you did not make this request, you can safely ignore this email - your account remains secure.

For security reasons, this link will only be valid for a limited time.

If you need any further assistance, we’re here to help.

Thank you,
links-digest`

        mailService.sendEmail2("[links-digest] Recover Password", 
                                     emailBody.replaceAll('\n', '<br />'),
                                     user.name,
                                     user.email,
                                     process.env.SERVER_FROM_NAME, 
                                     process.env.SERVER_FROM_EMAIL,
                                     user._id, "RECOVER_PASSWORD")

        res.status(200).send({ error: 1, message: "" });
        loggerUtils.log("recover pass: successfully, " + email)
    }
    catch (err: any) {
        loggerUtils.error("recover pass failed: " +  err.message);
        return res.status(401).send({ error: 999, message: 'Recover pass failed' });
    }   
}

export const handleResetPass = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { email, activation, password } = body;   

        if (!(email && activation && password)) {
            loggerUtils.log("reset pass: Wrong paramenter");
            return res.status(400).send({ message: 'Email is required' });
        }

        const user = await UserModel.findOne({ email });

        if (!user) { 
            loggerUtils.log("reset pass: User not found, " + email)
            return res.status(404).send({ message: 'User not found' });
        }

        if (user.recover_pass_code !== activation) {
            loggerUtils.log("reset pass: wrong activation code, " + email)
            return res.status(500).json({ error: 999, message: 'Wrong activation code' });
        }


        if (!user.recover_pass_createdAt) {
            res.status(500).json({error: 902, message: 'Activation code expired', data: null})
            return;
        }

        var recoverDate = user.recover_pass_createdAt;
        recoverDate.setHours(recoverDate.getHours() + 1);
        var date = Date.now();

        if (recoverDate.getTime() < date) {
            res.status(500).json({error: 902, message: 'Activation code expired', data: null})
            return;
        }

        if (!password || password.length < 6) {
            res.status(500).json({error: 902, message: 'Invalid password', data: null})
            return;
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const update = { password: hashedPassword, recover_pass_code: "" }
        const newUser = await UserModel.findOneAndUpdate({ email }, update);

        res.status(200).json({ error: 0, message: "" });
        loggerUtils.log("reset pass: successfully, " + email)
    }
    catch (err: any) {
        loggerUtils.error("reset pass failed: " +  err.message);
        return res.status(401).send({ error: 999, message: 'Couldn\'t recover code' });
    }   
}