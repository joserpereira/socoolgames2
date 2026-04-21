import { Router } from 'express';
const controller = require('../../controllers/emailSubscriptonsController')

export const emailSubscriptionsRoutes = (router: Router, baseUrl: string) => {
    router.post(baseUrl + '/', controller.insertSubscription);
    router.get(baseUrl + '/count',  controller.getStats);
    router.get(baseUrl + '/', controller.getSubscriptions);
    router.get(baseUrl + '/:id', controller.getSubscriptionById);
    router.put(baseUrl + '/:id', controller.updateSubscription);
    router.delete(baseUrl + '/:id', controller.deleteSubscription);
}
