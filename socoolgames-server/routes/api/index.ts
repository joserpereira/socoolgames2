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
const { emailSubscriptionsRoutes } = require('./emailSubscriptons.routes')
const { emailConfigsRoutes } = require('./emailConfigs.routes')
const { menusRoutes } = require('./menus.routes')

// const { fileRoutes } = require('./file.routes')

// Declaration
export const routes = (router: Router) => {

    sitemapRoutes(router, '/')
    userRoutes(router, '/api/users')
    // categoryRoutes(router, '/api/categories')
    authenticationRoutes(router, '/api/auth')
    pageRoutes(router, '/api/pages')
    articleRoutes(router, '/api/articles')

    imageRoutes(router, '/api/images')
    emailSubscriptionsRoutes(router, '/api/email-subscriptions')
    emailConfigsRoutes(router, '/api/email-serverconfigs')
    menusRoutes(router, '/api/menus')

    // scrapperRoutes(router, '/api/scrapper')
    // contactUsRoutes(router, '/api/contactus')
    // fileRoutes(router, '/api/files')

}