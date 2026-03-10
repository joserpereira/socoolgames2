import { Request, Response} from 'express';
import { Logger } from '../utils/loggerUtils';

const imageService = require('../services/image.service')
const loggerUtils = new Logger();

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

        const result = imageService.uploadFile(req.file);
        res.status(200).json({error: 0, message: '', data: result.data})
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 999, message: "Upload failed" })
    }
}

