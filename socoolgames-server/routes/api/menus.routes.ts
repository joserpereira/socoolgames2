import { Router } from 'express';
const controller = require('../../controllers/menusController')
const verifyJWTToken = require('../../middlewares/verifyJWT')

export const menusRoutes = (router: Router, baseUrl: string) => {
    router.get(baseUrl + '/', controller.getItems);
    router.get(baseUrl + '/count',  controller.getStats);
    // router.get(baseUrl + '/nameref/:nameref', controller.getItemByNameRef);
    router.get(baseUrl + '/main', controller.getMainItem);
    router.get(baseUrl + '/:id', controller.getItem);
    router.put(baseUrl + '/:id', verifyJWTToken.verifyJWTToken, controller.updateItem);
    router.post(baseUrl + '/', verifyJWTToken.verifyJWTToken, controller.createItem)
    router.delete(baseUrl + '/:id', verifyJWTToken.verifyJWTToken, controller.deleteItem)    
}