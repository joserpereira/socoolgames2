import { Logger } from '../utils/loggerUtils';
const loggerUtils = new Logger();

const path = require("path")
const slugify = require("slugify")
const fs = require("fs")

const baseDir = './public/'
const model = require('../models/file')

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


    console.log("services uploadFile2")

    const fullPath = path.join(folder, baseName);
    let errorMessage = "";
console.log("services uploadFile3", fullPath)    
    await fs.writeFile(fullPath, file.buffer, (err: any) => {
      if (err) {
        console.error("Failed to save " + file.originalname + ".\n" + err.message);
        return {error: errorMessage ? 999 : 0, message: errorMessage, data: null}
      }
    });

    console.log("services uploadFile4", fullPath)
    const fileInstance = {
      original: file.originalname,
      name: baseName,
      fullPath: fullPath
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

const exportedFunctions = {
    uploadFile, getItems, deleteItem
};
module.exports = exportedFunctions;