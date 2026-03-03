import { Router } from "express";

const authController = require('../../controllers/authController')
const refreshTokenController = require('../../controllers/refreshTokenController')
const logoutController = require('../../controllers/logoutController')

export const authenticationRoutes = (router: Router, baseUrl: string) => {
    // check authentication 
    router.get(baseUrl + '/user', authController.handleAuthenticatedUser);

    // Login route
    router.post(baseUrl + '/login', authController.handleLogin);

    // Refresh Token route
    router.post(baseUrl + '/refresh', refreshTokenController.handleRefreshToken);

    // Logout
    router.get(baseUrl + '/logout', logoutController.handleLogout);

    // Recover password route
    router.post(baseUrl + '/recover-pass', authController.handleRecoverPass);

    // Reset password route
    router.post(baseUrl + '/reset-pass', authController.handleResetPass);

}

