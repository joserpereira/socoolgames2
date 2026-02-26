import { Request, Response} from 'express';
import { sign, verify } from 'jsonwebtoken';
import { Logger } from '../utils/loggerUtils';
const loggerUtils = new Logger();

export const handleRefreshToken = async (req: Request, res: Response) => {
    try {
        const cookies = req.cookies["refresh_token"];
        const payload: any = verify(cookies, process.env.REFRESH_TOKEN_SECRET || "");
        if (!payload) {
            return res.status(401).send({ message: 'Unauthenticated2' });
        }   
        const accessToken = sign({ userId: payload.userId, email: payload.email }, process.env.ACCESS_TOKEN_SECRET || "", { expiresIn: '15m' });
        res.cookie('access_token', accessToken, { httpOnly: true, maxAge: 15 * 60 * 1000 });
        //const accessToken = sign({ userId: payload.userId, email: payload.email }, process.env.ACCESS_TOKEN_SECRET || "", { expiresIn: '1m' });
        //res.cookie('access_token', accessToken, { httpOnly: true, maxAge: 1 * 60 * 1000 });
        res.status(200).send({ message: 'success', token: accessToken });
    }   
    catch (err: any) {
        loggerUtils.error("Handle Refresh Token: " + err.message);
        return res.status(401).send({ message: 'Unauthenticated3' });
    }   
}