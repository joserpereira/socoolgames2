import { Request, Response} from 'express';
import { Logger } from '../utils/loggerUtils';
const loggerUtils = new Logger();

export const handleLogout = async (req: Request, res: Response) => {
    try
    {
        loggerUtils.debug("logout")
        res.clearCookie('access_token');
        res.clearCookie('refresh_token');
        res.status(200).send({ message: 'Logout successful' });
    }
    catch (err: any) {
        loggerUtils.error("Logout Error, " +  err.message);
        return res.status(500).send({ message: 'Error logging out', error: err });
    }
};