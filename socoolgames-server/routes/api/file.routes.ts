import { Router } from 'express';
const controller = require('../../controllers/fileController')
const verifyJWTToken = require('../../middlewares/verifyJWT')

const baseDir = './public/'
var multer = require("multer")

var storage = multer.diskStorage({ 
    destination: function (req: Request, file: any, cb: any) {
        cb(null, baseDir)
    },
    filename: function (req: Request, file: any, cb: any) {
        cb(null, file.originalname)
    }
});

var upload = multer({ 
    storage: storage
}).single('file');

export const fileRoutes = (router: Router, baseUrl: string) => {

    router.get(baseUrl + '/', controller.getFiles);
    router.get(baseUrl + '/list', controller.getFileList);
    router.post(baseUrl + '/addFile/:instance_id/:file_category/:idx', verifyJWTToken.verifyJWTToken, upload, controller.uploadFile)
}

