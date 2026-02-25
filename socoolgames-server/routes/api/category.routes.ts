import { Router } from 'express';
const controller = require('../../controllers/categoryController')
const verifyJWTToken = require('../../middleware/verifyJWT')
export const categoryRoutes = (router: Router, baseUrl: string) => {

    router.get(baseUrl + '/', controller.getItems);
    router.get(baseUrl + '/count',  controller.getStats);
    router.get(baseUrl + '/published', controller.getPublishedItems);
    router.get(baseUrl + '/:id', controller.getItem);
    router.put(baseUrl + '/:id', verifyJWTToken.verifyJWTToken, controller.updateItem);
    router.post(baseUrl + '/', verifyJWTToken.verifyJWTToken, controller.createItem)
    router.delete(baseUrl + '/:id', verifyJWTToken.verifyJWTToken, controller.deleteItem)
    
}


