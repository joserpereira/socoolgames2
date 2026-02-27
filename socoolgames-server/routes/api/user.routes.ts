import { Router } from 'express';
const controller = require('../../controllers/userController')
const verifyJWTToken = require('../../middlewares/verifyJWT')

export const userRoutes = (router: Router, baseUrl: string) => {

    router.get(baseUrl + '/', controller.getUsers);
    router.get(baseUrl + '/count', controller.getStats);
    router.post(baseUrl + '/', controller.createUser)
    router.delete(baseUrl + '/:id', verifyJWTToken.verifyJWTToken, controller.deleteUser)
    router.get(baseUrl + "/test/all", controller.allAccess);
    router.get(baseUrl + "/test/user", [verifyJWTToken.verifyJWTToken], controller.userBoard);
    router.get(baseUrl + "/test/mod", [verifyJWTToken.verifyJWTToken, verifyJWTToken.isModerator],
                                      controller.moderatorBoard);
    router.get(baseUrl + "/test/admin", [verifyJWTToken.verifyJWTToken, verifyJWTToken.isAdmin], 
                                            controller.adminBoard);
}


