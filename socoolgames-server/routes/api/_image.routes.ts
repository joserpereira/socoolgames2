import { Router } from 'express';
const controller = require('../../controllers/imageController')
const verifyJWTToken = require('../../middlewares/verifyJWT')

const baseDir = './public/files/userFiles/'
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


export const linkRoutes = (router: Router, baseUrl: string) => {

    router.get(baseUrl + '/', controller.getImages);
    router.get(baseUrl + '/info/:path', controller.getImageInfo);
    router.post(baseUrl + '/resize/:path/:width/:height', controller.getImageResize);
    router.post(baseUrl + '/convert/:path', controller.getImageConvert);
    router.post(baseUrl + '/:instance_id/:file_category/:idx', verifyJWTToken.verifyJWTToken, upload, controller.uploadFile)
    router.delete(baseUrl + '/:id', verifyJWTToken.verifyJWTToken, controller.deleteLink)    
}