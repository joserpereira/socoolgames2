import { Logger } from '../utils/loggerUtils';
const loggerUtils = new Logger();

const path = require("path")
const slugify = require("slugify")
const fs = require("fs")
const sharp = require("sharp")

const baseDir = './public/'
const model = require('../models/image')

const sizes = [
  { name: "thumb", width: 300 },
  { name: "medium", width: 800 },
  { name: "large", width: 1600 }
]

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
        filter = { $or: [ { original: { $regex: (search), $options: 'i' }} ], ...filter }
    }
    return filter;
}

async function uploadFile(file: any): Promise<any> {

    console.log("services uploadFile")

    const baseName = slugify(
      path.parse(file.originalname).name,
      { lower: true, strict: true }
    )
    const timestamp = Date.now()
    let folder = path.join(baseDir, "uploads")
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }
    folder = path.join(folder, "images")
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder)
    }
    const results = {} as any

    const image = {
      original: file.originalname,
    } as any

    for (const size of sizes) {
      const filename = `${baseName}-${size.name}-${timestamp}.webp`
      const filepath = path.join(folder, filename)
      await sharp(file.buffer)
        .resize(size.width)
        .webp({ quality: 82 })
        .toFile(filepath)
      results[size.name] = `/uploads/images/${filename}`
      image[size.name] = `/uploads/images/${filename}`;
    }

    const newitem = await model.create(image);;
    return {error: 0, message: '', data: newitem}          
}


const exportedFunctions = {
    uploadFile, getItems
};
module.exports = exportedFunctions;