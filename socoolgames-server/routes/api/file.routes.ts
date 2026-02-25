import { Router } from 'express';
const controller = require('../../controllers/fileController')
const verifyJWTToken = require('../../middleware/verifyJWT')

const baseDir = './public/files/userFiles/'


export const fileRoutes = (router: Router, baseUrl: string) => {

    router.get(baseUrl + '/', controller.getFiles);
}