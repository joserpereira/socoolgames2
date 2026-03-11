import { Request, Response} from 'express';
import { Logger } from '../utils/loggerUtils';

const fileService = require('../services/image.service')
const loggerUtils = new Logger();
const mongoUtils = require('../utils/mongo')

export const getFiles = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get files")
        var filter = mongoUtils.getFilterByParameter(req)
        var pagination = mongoUtils.getPaginationParameters(filter)
        const result = await fileService.getFiles(pagination.filter, pagination.skip, pagination.limit, pagination.search);
        res.status(200).json({error: 0, message: '', data: result.data, count: result.count})
    }
    catch(error: any)
    {
        loggerUtils.error("Get files Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const uploadFile = async (req: Request, res: Response) => {

    try {
        loggerUtils.debug("upload files")
        const { instance_id, file_category, idx } = req.params
        const body = req.body;
        const { name } = body;   

        const result = await fileService.uploadFile(instance_id, file_category, idx, name);
        res.status(200).json(result);
    } 
    catch(error: any)
    {
        loggerUtils.error("Upload Files Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const getImageInfo = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get link by path")
        const { path } = req.params;
        const items = await fileService.getImageInfo(path);
        res.status(200).json({error: 0, message: '', data: items})
    }
    catch(error: any)
    {
        loggerUtils.error("Get files Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const getImageConvert = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get image info")
        const { path } = req.params;
        const items = await fileService.getImageConvert(path);
        res.status(200).json({error: 0, message: '', data: items})
    }
    catch(error: any)
    {
        loggerUtils.error("Get files Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    } 
}

export const getImageResize = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get link by path")
        const { path, width, height } = req.params;
        const items = await fileService.getImageResize(path, width, height);
        res.status(200).json({error: 0, message: '', data: items})
    }
    catch(error: any)
    {
        loggerUtils.error("Get files Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}


export const deleteFile = async (req: any, res: Response) => {
    try
    {
        const {id} = req.params;
        const userId = req["userId"]
        const item = await fileService.deleteLink(id, userId);
        if (!item) {
            res.status(404).json({error: 404, message: `Cannot find any file with ID '${id}'`})                
        }
        else {
            res.status(200).json({error: 0, message: '', data: item})
        }
    }
    catch(error: any)
    {
        loggerUtils.error("Delete File Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}