import { Request, Response} from 'express';
const EmailSubscripton = require('../models/emailSubscripton');
const mongoUtils = require('../utils/mongo');
const logger = require('@joserpereira/lazuli-labs-logger')
const emailService = require('../services/email.service');

export const insertSubscription = async (req: Request, res: Response) => {
    try
    {
        const emailSubscripton = await EmailSubscripton.create(req.body.item);
        res.status(200).json({error: 0, message: '', data: emailSubscripton})

        const configName = req.body.item.emailConfigName;
        const language = req.body.item.language;
        const email = req.body.item.email;

        emailService.sendEmail(configName, email, language);
    }
    catch(error: any)
    {
        logger.error(error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const getSubscriptions = async (req: Request, res: Response) => {
    try
    {
        var filter = mongoUtils.getFilterByParameter(req)
        
        const pagination = mongoUtils.getPaginationParameters(filter)
        const items = await EmailSubscripton.find(pagination.filter).skip(pagination.skip).limit(pagination.limit).sort({'_id': -1});
        res.status(200).json({error: 0, message: '', data: items, count: items.count})
    }
    catch(error: any)
    {
        logger.error(error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const getSubscriptionById = async (req: Request, res: Response) => {

    try
    {
        const {id} = req.params;
        const emailSubscriptons = await EmailSubscripton.findById(id);
        res.status(200).json({error: 0, message: '', data: emailSubscriptons})
    }
    catch(error: any)
    {
        logger.error(error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const updateSubscription = async (req: Request, res: Response) => {
    try
    {
        const {id} = req.params;
        var ce = req.body.item;
        // delete pag._id
        const emailSubscripton = await EmailSubscripton.findByIdAndUpdate(id, ce,   {
            new: true
          });
        if (!emailSubscripton) {
            res.status(404).json({error: 404, message: `Cannot find any email with ID '${id}'`})                
        }
        else {
            const emailSubscriptons = await EmailSubscripton.findById(id);
            res.status(200).json({error: 0, message: '', data: emailSubscriptons})
        }
    }
    catch(error: any)
    {
        logger.error(error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const deleteSubscription = async (req: Request, res: Response) => {
    try
    {
        const {id} = req.params;
        const emailSubscripton = await EmailSubscripton.findByIdAndDelete(id);
        if (!emailSubscripton) {
            res.status(404).json({error: 404, message: `Cannot find any email with ID '${id}'`})                
        }
        else {
            const emailSubscriptons = await EmailSubscripton.findById(id);
            res.status(200).json({error: 0, message: '', data: emailSubscriptons})
        }
    }
    catch(error: any)
    {
        logger.error(error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}

export const getStats = async (req: Request, res: Response) => {
    try
    {
        const itemTotal = await EmailSubscripton.countDocuments({deleted: { $ne: true }});
        const itemActive = await EmailSubscripton.countDocuments({ deleted: { $ne: true }, active: true });
        const itemDeleted = await EmailSubscripton.countDocuments({ deleted: true });

        const result =  { total: itemTotal, active: itemActive, deleted: itemDeleted };
        res.status(200).json({error: 0, message: '', data: result})
    }
    catch(error: any)
    {
        logger.error(error.message)
        res.status(500).json({error: 999, message: error.message})
    }
}
