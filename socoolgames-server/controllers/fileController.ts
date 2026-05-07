import { Request, Response} from 'express';
import { Logger } from '../utils/loggerUtils';
import fs from "fs";

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

export const downloadFile = async (req: Request, res: any) => {

    try
    {
        loggerUtils.debug("download file")

        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 999, message: "No file uploaded" })
        }

        const result = await service.downloadFile(id, true);
        if (result.error !== 0) {
            return res.status(404).json(result)
        }

        res.setHeader("Content-Type", result.data.type);
        res.setHeader("Content-Disposition", 'attachment; filename="'+result.data.original +'"');
        res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
        
        // ✅ Stream (better than readFile)
        const stream = fs.createReadStream(result.data.fullPath);
        stream.pipe(res);

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 999, message: "Download failed" })
    }
}

export const previewFile = async (req: Request, res: any) => {

    try
    {        
        loggerUtils.debug("download file")

        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 999, message: "No file uploaded" })
        }

        const result = await service.downloadFile(id, true);
        if (result.error !== 0) {
            return res.status(404).json(result)
        }

        res.setHeader("Content-Type", result.data.type);
    
        const stream = fs.createReadStream(result.data.fullPath);
        stream.pipe(res);

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 999, message: "Download failed" })
    }
}

export const submit = async (req: Request, res: any) => {

    try
    {        
        loggerUtils.debug("download file")

        const { id } = req.params;
        const { email, emailTemplate, language } = req.body;
        if (!id) {
            return res.status(400).json({ error: 999, message: "No file uploaded" })
        }
        console.log("submit", id, email);

        const result = await service.submitEmail(id, email, emailTemplate, language);
        if (result.error !== 0) {
            return res.status(500).json(result)
        }

        res.status(200).json({error: 0, message: '', data: result.data})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 999, message: "Download failed" })
    }
}


export const getStats = async (req: Request, res: Response) => {

    try
    {
        loggerUtils.debug("get file stats")
        const item = await service.getStats();        
        res.status(200).json({error: 0, message: '', data: item})
    }
    catch(error: any)
    {
        loggerUtils.error("Get File Stats Error: " + error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}
