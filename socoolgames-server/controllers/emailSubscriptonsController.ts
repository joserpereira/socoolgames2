import { Request, Response} from 'express';
const EmailSubscripton = require('../models/emailSubscripton');
const EmailServerConfig = require('../models/emailServerConfig');
const mongoUtils = require('../utils/mongo');
const stringUtils = require('../utils/string');
const logger = require('@joserpereira/lazuli-labs-logger')
const mail = require('../utils/mail');

export const insertSubscription = async (req: Request, res: Response) => {
    try
    {

        console.log("body", req.body)
        const emailSubscripton = await EmailSubscripton.create(req.body.item);
        res.status(200).json({error: 0, message: '', data: emailSubscripton})

        const serverConfig = await EmailServerConfig.find({configName: req.body.item.emailConfigName})
        var language = req.body.item.language

        if (serverConfig && serverConfig.length > 0) {
            var config = serverConfig[0]
   
            var content = "";
            var emailName = "";
            var emailSubject = ""

            if (config?.translations !== undefined && config.translations[language] !== undefined) {
                content = stringUtils.replaceAll((config.translations[language].emailContent ?? ""), "\n", "<br />");
                emailName = config.translations[language].emailName
                emailSubject = config.translations[language].emailSubject
            }
            var origin = req.get('origin');

            if (config.showDownloadlink) {
                var file = req.body.item.downloadFile
                if (file)    
                {
                    var link = "<a href='" + origin + "/"+language+"/download/"+file+"?id="+emailSubscripton.id+"&email="+req.body.item.email+"&type="+emailSubscripton.type+"&language="+language+"'><strong>DOWNLOAD</strong></a>"
                    if (content.includes("{{download}}"))
                        content = content.replaceAll("{{download}}", link)
                    else
                        content = content + "<br /><br />" + link;
                }                
                    
            }

            if (content === "") {
                logger.info("No email content in configurations")
            } else {
                mail.sendEmail(emailSubject, 
                                content, 
                                req.body.item.email, 
                                config.emailFrom,
                                config.emailUsername,
                                config.emailPass,
                                emailName)
                logger.info("email sent to " + req.body.item.email)
            }
        } 
        else{
            logger.info("server config doesn't exists")
        }
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
        const emailSubscriptons = await EmailSubscripton.find(filter);
        res.status(200).json({error: 0, message: '', data: emailSubscriptons})
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