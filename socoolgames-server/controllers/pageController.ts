import { Request, Response} from 'express';
import { Logger } from '../utils/loggerUtils';

const service = require('../services/instance.service')
const mongoUtils = require('../utils/mongo')

const loggerUtils = new Logger();
const collectionName = "page";

export const getItems = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get pages")
        var filter = mongoUtils.getFilterByParameter(req)
        const result = await service.getItems(collectionName, filter);
        res.status(result.error === 0 ? 200 : 500).json(result)
    }
    catch(error: any)
    {
        loggerUtils.error("Get pages Error: " + error.message)
        res.status(500).json({error: 999, message: error.message, data: null})
    }
}

export const getItem = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get category")
        const { id } = req.params;
        const item = await service.getItem(collectionName, id);
        res.status(200).json({error: 0, message: '', data: item.data})
    }
    catch(error: any)
    {
        loggerUtils.error("Get Categories Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const getItemByNameRef = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get category")
        const { nameRef } = req.params;
        const item = await service.getItemWithFilter(collectionName, { nameRef, active: true, deleted: { $ne: true } });
        res.status(200).json({error: 0, message: '', data: item.data})
    }
    catch(error: any)
    {
        loggerUtils.error("Get Categories Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const createItem = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("page create")

        const user = req.body.item;

        const result = await service.createItem(collectionName, user);
        res.status(200).json(result)
    }
    catch(error: any)
    {
        loggerUtils.error(error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const updateItem = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("page update")
        const user = req.body.item;

        const result = await service.updateItem(collectionName, user._id, user);
        res.status(200).json(result)
    }
    catch(error: any)
    {
        loggerUtils.error(error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const deleteItem = async (req: Request, res: Response) => {
    try
    {
        const {id} = req.params;
        const item = await service.deleteItem(collectionName, id);
        res.status(item.error === 0 ? 200 : (item.error == 404 ? 404 : 500)).json(item)        
    }
    catch(error: any)
    {
        loggerUtils.error("Delete Page Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const getStats = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get page stats")
        const item = await service.getStats(collectionName);        
        res.status(200).json({error: 0, message: '', data: item})
    }
    catch(error: any)
    {
        loggerUtils.error("Get Page Stats Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}
