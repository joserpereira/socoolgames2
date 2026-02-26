import { Router } from "express";
const { userRoutes } = require('./user.routes')
const { authenticationRoutes } = require('./authentication.routes')
// const { linkRoutes } = require('./link.routes')
// const { contactUsRoutes } = require('./contactus.routes')
// const { categoryRoutes } = require('./category.routes')
// const { scrapperRoutes } = require('./scrapper.routes')
const { sitemapRoutes } = require('./sitemap.routes')
// const { fileRoutes } = require('./file.routes')

// Declaration
export const routes = (router: Router) => {

    sitemapRoutes(router, '/')
    userRoutes(router, '/api/users')
    // linkRoutes(router, '/api/links')
    // categoryRoutes(router, '/api/categories')
    authenticationRoutes(router, '/api/auth')
    // scrapperRoutes(router, '/api/scrapper')
    // contactUsRoutes(router, '/api/contactus')
    // fileRoutes(router, '/api/files')

}