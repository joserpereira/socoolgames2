import { Router } from 'express';
const controller = require('../../controllers/contactUsController')

export const contactUsRoutes = (router: Router, baseUrl: string) => {

    router.get(baseUrl + '/', controller.getItems);
    router.get(baseUrl + '/count', controller.getStats);
    router.get(baseUrl + '/:id', controller.getItem);
    router.put(baseUrl + '/:id', controller.updateItem);
    router.post(baseUrl + '/', controller.createItem)
    router.delete(baseUrl + '/:id', controller.deleteItem)
    
}
