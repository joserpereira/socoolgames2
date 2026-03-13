import { Router } from 'express';
const controller = require('../../controllers/imageController')
const verifyJWTToken = require('../../middlewares/verifyJWT')

const multer = require("multer")

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
})

export const imageRoutes = (router: Router, baseUrl: string) => {
    router.get(baseUrl + '/', controller.getItems);
    router.post(baseUrl + '/upload', verifyJWTToken.verifyJWTToken, upload.single("file"), controller.uploadFile);
}

