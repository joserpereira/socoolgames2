import { Router } from 'express';
const controller = require('../../controllers/userController')
const verifyJWTToken = require('../../middleware/verifyJWT')

export const userRoutes = (router: Router, baseUrl: string) => {

    router.get(baseUrl + '/', controller.getUsers);
    router.get(baseUrl + '/count', controller.getStats);
    router.post(baseUrl + '/', controller.createUser)
    router.delete(baseUrl + '/:id', verifyJWTToken.verifyJWTToken, controller.deleteUser)    
}


