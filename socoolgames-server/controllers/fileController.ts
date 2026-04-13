import { Request, Response} from 'express';
import { Logger } from '../utils/loggerUtils';

const service = require('../services/file.service')
const mongoUtils = require('../utils/mongo')
const loggerUtils = new Logger();

export const getItems = async (req: Request, res: Response) => {

    try
    {
        console.log("get files")
        loggerUtils.debug("get files")

        var filter = mongoUtils.getFilterByParameter(req)
        var pagination = mongoUtils.getPaginationParameters(filter)
        delete filter.search;

        const result = await service.getItems(pagination.filter, pagination.skip, pagination.limit, pagination.search);
        res.status(result.error === 0 ? 200 : 500).json(result)
    }
    catch(error: any)
    {
        loggerUtils.error("Get files Error: " + error.message)
        res.status(500).json({error: 999, message: error.message, data: null})
    }
}

export const deleteItem = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("delete file")
        const { id } = req.params;

        const result = await service.deleteItem(id);
        res.status(result.error === 0 ? 200 : 500).json(result)
    }
    catch(error: any)
    {
        loggerUtils.error("Delete file Error: " + error.message)
        res.status(500).json({error: 999, message: error.message, data: null})
    }
}

export const uploadFile = async (req: any, res: Response) => {

    try
    {
        loggerUtils.debug("upload files")

        if (!req.file) {
            return res.status(400).json({ error: 999, message: "No file uploaded" })
        }

        console.log("req.file:", req.file);
        // if (!req.file.mimetype.startsWith("image/")) {
        //     return res.status(400).json({ error: 999, message: "Invalid file type" })
        // }

        const result = service.uploadFile(req.file);
        res.status(200).json({error: 0, message: '', data: result.data})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 999, message: "Upload failed" })
    }
}

