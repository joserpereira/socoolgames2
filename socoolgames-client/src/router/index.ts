import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import publicRoutes from './publicRoutes'
import adminRoutes from './adminRoutes'
import store from '@/store';

const routes: RouteRecordRaw[] = [
  ...publicRoutes,
  //...adminRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
   if (to.meta.requiresAuth && !store.state.auth.auth)  {
     next("/admin/signin?back="+to.fullPath);
   } else {
    next();
   }
});

export default router
