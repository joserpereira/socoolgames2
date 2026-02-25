import { Router } from 'express';
const controller = require('../../controllers/scrapperController')

export const scrapperRoutes = (router: Router, baseUrl: string) => {

    router.get(baseUrl + '/', controller.getData);
    
}


