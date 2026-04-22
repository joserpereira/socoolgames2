import { Request, Response} from 'express';
import { Logger } from '../utils/loggerUtils';

const contactUsService = require('../services/contactus.service')
const loggerUtils = new Logger();
const mongoUtils = require('../utils/mongo')

export const getItems = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get contactus")
        var filter = mongoUtils.getFilterByParameter(req)
        var pagination = mongoUtils.getPaginationParameters(filter)

        const result = await contactUsService.getItems(pagination.filter, pagination.skip, pagination.limit);
        res.status(200).json({error: 0, message: '', data: result.data, count: result.count})
    }
    catch(error: any)
    {
        loggerUtils.error("Get contacts Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const getItem = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get contact")
        const { id } = req.params;
        const item = await contactUsService.getLink({ _id: id });
        res.status(200).json({error: 0, message: '', data: item})
    }
    catch(error: any)
    {
        loggerUtils.error("Get contacts Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const getStats = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get stats")
         const item = await contactUsService.getStats();
         res.status(200).json({error: 0, message: '', data: item})
    }
    catch(error: any)
    {
        loggerUtils.error("Get contactus Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const createItem = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("contactus create")
        const {item} = req.body;    
        const data = await contactUsService.insertItem(item);
        res.status(200).json(data)
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
        const {id} = req.params;
        const data = await contactUsService.updateItem(id, req.body.item);
        res.status(200).json(data)
    }
    catch(error: any)
    {
        loggerUtils.error("Delete Contact Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const deleteItem = async (req: Request, res: Response) => {
    try
    {
        const {id} = req.params;
        console.log("delete", id)
        const item = await contactUsService.deleteItem(id);
        if (!item) {
            res.status(404).json({error: 404, message: `Cannot find any contact with ID '${id}'`})                
        }
        else {
            res.status(200).json({error: 0, message: '', data: item})
        }
    }
    catch(error: any)
    {
        loggerUtils.error("Delete contactus Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}