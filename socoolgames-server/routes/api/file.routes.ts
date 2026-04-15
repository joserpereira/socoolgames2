import { Router } from 'express';
const controller = require('../../controllers/fileController')
const verifyJWTToken = require('../../middlewares/verifyJWT')

const multer = require("multer")

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }
})

export const fileRoutes = (router: Router, baseUrl: string) => {
  router.get(baseUrl + '/', controller.getItems);
  router.get(baseUrl + '/:id/download', controller.downloadFile);
  router.get(baseUrl + '/:id/preview', controller.previewFile);
  router.delete(baseUrl + '/:id', verifyJWTToken.verifyJWTToken, controller.deleteItem);
  router.post(baseUrl + '/upload', verifyJWTToken.verifyJWTToken, upload.single("file"), controller.uploadFile);
  router.post(baseUrl + '/:id/submit', controller.submit);
}