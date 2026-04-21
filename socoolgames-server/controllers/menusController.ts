import { Request, Response} from 'express';
import { Logger } from '../utils/loggerUtils';

const service = require('../services/instance.service')
const mongoUtils = require('../utils/mongo')

const loggerUtils = new Logger();
const collectionName = "menus";

export const getItems = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get menus")
        var filter = mongoUtils.getFilterByParameter(req)
        var pagination = mongoUtils.getPaginationParameters(filter)
        const result = await service.getItems(collectionName, pagination.filter, pagination.skip, pagination.limit, pagination.search);
        res.status(result.error === 0 ? 200 : 500).json(result)
    }
    catch(error: any)
    {
        loggerUtils.error("Get items Error: " + error.message)
        res.status(500).json({error: 999, message: error.message, data: null})
    }
}


export const getMainItem = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get menu")
        const { id } = req.params;
        let item = null;
        const items = await service.getItems(collectionName, { isMainMenu: true });
        if (items?.data?.length > 0) {
            item = items.data[0];
        }

        res.status(200).json({error: 0, message: '', data: item})
    }
    catch(error: any)
    {
        loggerUtils.error("Get menus Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}


export const getItem = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get menu")
        const { id } = req.params;
        const item = await service.getItem(collectionName, id);
        res.status(200).json({error: 0, message: '', data: item.data})
    }
    catch(error: any)
    {
        loggerUtils.error("Get menus Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}
/*
export const getItemByNameRef = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get category")
        const { nameref } = req.params;
        
        const item = await service.getItemWithFilter(collectionName, { slug: nameref, active: true, deleted: { $ne: true } });
        if (item.data)
            res.status(200).json({error: 0, message: '', data: item.data})
        else {
            res.status(200).json({error: 900, message: 'Page not found', data: item.data})
        }
            

    }
    catch(error: any)
    {
        loggerUtils.error("Get Categories Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}
*/
export const createItem = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("menu create")
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
        loggerUtils.debug("menu update")
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
        loggerUtils.error("Delete menu Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const getStats = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get menu stats")
        const item = await service.getStats(collectionName);        
        res.status(200).json({error: 0, message: '', data: item})
    }
    catch(error: any)
    {
        loggerUtils.error("Get menu Stats Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}
