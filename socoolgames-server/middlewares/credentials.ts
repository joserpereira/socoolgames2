import { Request, Response} from 'express';

const allowedOrigins = require('../config/allowedOrigins');

export const credentials = (req: Request, res: Response, next: any) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Origin', '*')
    }
    next();
}
