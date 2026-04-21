import { Logger } from '../utils/loggerUtils';
const loggerUtils = new Logger();

const path = require("path")
const slugify = require("slugify")
const fs = require("fs")

const baseDir = './public/'
const model = require('../models/file')
const FileDownloadModel = require('../models/fileDownload')
const EmailConfigModel = require('../models/emailserverconfig')
const mail = require('../utils/mail');
const service = require('../services/instance.service')

async function getItems(filter: any, skip = 0, limit = 5, search = ''): Promise<any> {
    try
    {
        var filter = getFilter(filter, search);
        loggerUtils.debug("get items");

        const items = await model.find(filter).skip(skip).limit(limit).sort({'_id': -1});
        const total = await model.find(filter).countDocuments();
        return {error: 0, message: '', data: items, count: total}
    }
    catch(error: any)
    {
        loggerUtils.error("Get Items Error: " + error.message)
        return {error: 999, message: error.message, data: null}
    }
}

function getFilter(filter: any, search: string) {
    var filter = { deleted: { $ne: true }, ...filter }
    
    if (search?.length > 0) {
        filter = { $or: [ { "original": { $regex: (search), $options: 'i' }} ], ...filter }
    }
    return filter;
}

async function downloadFile(id: string): Promise<any> {
    try {
        const file = await model.findOne({ _id: id });

        if (!file || !file.fullPath) {
            return { error: 999, message: "File not found in database", data: null     };
        }

        if (!fs.existsSync(file.fullPath)) {
            return { error: 999, message: "File not found on disk", data: null };
        }

        return { error: 0, message: "", data: file };
    }
    catch (err: any) {
        console.error(err);
        return { error: 999, message: err.message, data: null };
    }
}

async function uploadFile(file: any): Promise<any> {

    const timestamp = Date.now()
    
    const baseName = slugify(
      path.parse(file.originalname).name,
      { lower: true, strict: true }
    )+timestamp + path.extname(file.originalname);

    let folder = path.join(baseDir, "uploads", "files")
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true })
    }


    const fullPath = path.join(folder, baseName);
    let errorMessage = "";

    await fs.writeFile(fullPath, file.buffer, (err: any) => {
      if (err) {
        console.error("Failed to save " + file.originalname + ".\n" + err.message);
        return {error: errorMessage ? 999 : 0, message: errorMessage, data: null}
      }
    });

    const fileInstance = {
      original: file.originalname,
      name: baseName,
      fullPath: fullPath,
      type: file.mimetype,
      size: file.size
    } as any
    
    const newitem = await model.create(fileInstance);
    return {error: errorMessage ? 999 : 0, message: errorMessage, data: newitem}          
}

async function deleteItem(id: string) {
    try
    {
        var filter = { _id: id }
        const item = await model.findOne(filter);
        if (!item) {
            return {error: 404, message: `Cannot find any image with ID '${id}'`};
        }

        console.log("services deleteItem", item)
        deleteFile(item.fullPath);

        const update = { deleted: true, deleteAt: new Date(Date.now()) }; //, deletedBy: userId };
        const itemUpdated = await model.findOneAndUpdate(filter, update);

        return {error: 0, message: '', data: itemUpdated}
    }
    catch(error: any)
    {
        loggerUtils.error(`Delete Image Error: ${error.message}`);
        return {error: 999, message: error.message, data: null}
    }
}

async function deleteFile(file: string) {
  fs.unlink(file, (err: any) => {
    if (err) {
        console.error("Failed to delete " + file + ".\n" + err.message);

    }
  })
}

async function submitEmail(id: string, email: string, emailTemplate: string, language: string): Promise<any> {
    try {
        const file = await model.findOne({ _id: id });

        if (!file || !file.fullPath) {
            return { error: 999, message: "File not found in database", data: null};
        }

        if (!fs.existsSync(file.fullPath)) {
            return { error: 999, message: "File not found on disk", data: null };
        }

        const fileDownload = new FileDownloadModel({
            email: email,
            emailTemplate: emailTemplate,
            fileId: id,
            fileOriginalName: file.original,
            fileFullPath: file.fullPath,
        });

        FileDownloadModel.create(fileDownload);

        const filter = {templateName: emailTemplate, deleted: { $ne: true } };
        const result = await service.getItems("emailtemplate", filter, 0, 1, "");

        if (result.error == 0 && result.data.length == 0) {
            console.error("Couldn't find Email Template");
            return { error: 0, message: "", data: file.fullPath };    
        }
        
        const templateItem = result.data[0]
        const config = await EmailConfigModel.findOne({configName: templateItem.configName, deleted: { $ne: true } })
        if (!config) {
            console.error("Couldn't find Email Config");
            return { error: 0, message: "", data: file.fullPath };    
        }

        const emailSubject = templateItem.emailSubject[language];
        const content = templateItem.emailContent[language];
        const emailName = templateItem.emailName[language];

        mail.sendEmail(emailSubject, 
                                content, 
                                null,
                                email, 
                                emailName,
                                config.emailFrom,
                                config.emailUsername,
                                config.emailPass)

        return { error: 0, message: "", data: file.fullPath };
    }
    catch (err: any) {
        console.error(err);
        return { error: 999, message: err.message, data: null };
    }
}

async function getStats(): Promise<any>    {
   const itemTotal = await model.countDocuments({deleted: { $ne: true }});
   const itemActive = await model.countDocuments({ deleted: { $ne: true }, active: true });
   const itemDeleted = await model.countDocuments({ deleted: true });

   return { total: itemTotal, active: itemActive, deleted: itemDeleted };
}

const exportedFunctions = {
    uploadFile, getItems, deleteItem, downloadFile, submitEmail, getStats
};
module.exports = exportedFunctions;