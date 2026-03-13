import { Request, Response} from 'express';
import { Logger } from '../utils/loggerUtils';

const service = require('../services/image.service')
const mongoUtils = require('../utils/mongo')
const loggerUtils = new Logger();

export const getItems = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get images")

        var filter = mongoUtils.getFilterByParameter(req)
        var pagination = mongoUtils.getPaginationParameters(filter)
        var search = pagination.search;
        delete filter.search;
        if (search?.length > 0) {
            filter.name = {$regex: (pagination.search),  $options: 'i'}
        }

        const result = await service.getItems(pagination.filter, pagination.skip, pagination.limit);
        res.status(result.error === 0 ? 200 : 500).json(result)
    }
    catch(error: any)
    {
        loggerUtils.error("Get images Error: " + error.message)
        res.status(500).json({error: 999, message: error.message, data: null})
    }
}

export const deleteItem = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("delete image")
        const { id } = req.params;

        const result = await service.deleteItem(id);
        res.status(result.error === 0 ? 200 : 500).json(result)
    }
    catch(error: any)
    {
        loggerUtils.error("Delete Image Error: " + error.message)
        res.status(500).json({error: 999, message: error.message, data: null})
    }
}

export const uploadFile = async (req: any, res: Response) => {

    try
    {
        loggerUtils.debug("upload files")

        if (!req.file) {
            return res.status(400).json({ error: 999, message: "No image uploaded" })
        }

        if (!req.file.mimetype.startsWith("image/")) {
            return res.status(400).json({ error: 999, message: "Invalid file type" })
        }

        const result = service.uploadFile(req.file);
        res.status(200).json({error: 0, message: '', data: result.data})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 999, message: "Upload failed" })
    }
}

