import { Router } from "express";
const { userRoutes } = require('./user.routes')
const { authenticationRoutes } = require('./authentication.routes')
// const { contactUsRoutes } = require('./contactus.routes')
// const { categoryRoutes } = require('./category.routes')
// const { scrapperRoutes } = require('./scrapper.routes')
const { sitemapRoutes } = require('./sitemap.routes')
const { pageRoutes } = require('./page.routes')
const { articleRoutes } = require('./article.routes')
const { imageRoutes } = require('./image.routes')
const { fileRoutes } = require('./file.routes')
const { emailSubscriptionsRoutes } = require('./emailSubscriptons.routes')
const { emailConfigsRoutes } = require('./emailConfigs.routes')
const { emailTemplatesRoutes } = require('./emailTemplates.routes')
const { menusRoutes } = require('./menus.routes')

// Declaration of all routes in this file
export const routes = (router: Router) => {

    sitemapRoutes(router, '/')
    userRoutes(router, '/api/users')
    // categoryRoutes(router, '/api/categories')
    authenticationRoutes(router, '/api/auth')
    pageRoutes(router, '/api/pages')
    articleRoutes(router, '/api/articles')

    imageRoutes(router, '/api/images')  
    fileRoutes(router, '/api/files')

    emailSubscriptionsRoutes(router, '/api/email-subscriptions')
    emailConfigsRoutes(router, '/api/email-serverconfigs')
    emailTemplatesRoutes(router, '/api/email-templates')
    menusRoutes(router, '/api/menus')

    // scrapperRoutes(router, '/api/scrapper')
    // contactUsRoutes(router, '/api/contactus')
}