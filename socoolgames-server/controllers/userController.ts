import { Request, Response} from 'express';
import { Logger } from '../utils/loggerUtils';

const userService = require('../services/user.service')

const loggerUtils = new Logger();
const mongoUtils = require('../utils/mongo')

export const getUsers = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get users")
        var filter = mongoUtils.getFilterByParameter(req)
        const result = await userService.getUsers(filter);
        res.status(result.error === 0 ? 200 : 500).json(result)
    }
    catch(error: any)
    {
        loggerUtils.error("Get Users Error: " + error.message)
        res.status(500).json({error: 999, message: error.message, data: null})
    }
}

export const createUser = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("user create")
        const user = req.body.item;

        const result = await userService.createUser(user);
        res.status(200).json(result)
    }
    catch(error: any)
    {
        loggerUtils.error(error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try
    {
        const {id} = req.params;
        const item = await userService.deleteUser(id);
        res.status(item.error === 0 ? 200 : (item.error == 404 ? 404 : 500)).json(item)        
    }
    catch(error: any)
    {
        loggerUtils.error("Delete User Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const getStats = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get user stats")
        const item = await userService.getStats();        
        res.status(200).json({error: 0, message: '', data: item})
    }
    catch(error: any)
    {
        loggerUtils.error("Get Users Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

exports.allAccess = (req: any, res: any) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req: any, res: any) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req: any, res: any) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req: any, res: any) => {
  res.status(200).send("Moderator Content.");
};