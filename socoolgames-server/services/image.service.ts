// import { Logger } from '../utils/loggerUtils';
// const loggerUtils = new Logger();

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

async function uploadFile(file: any): Promise<any>    {

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
    uploadFile
};
module.exports = exportedFunctions;