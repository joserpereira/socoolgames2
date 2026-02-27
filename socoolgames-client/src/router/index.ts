import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import publicRoutes from './publicRoutes'
import adminRoutes from './adminRoutes'

const routes: RouteRecordRaw[] = [
  ...publicRoutes,
  ...adminRoutes
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('user');
  if (to.meta.requiresAuth && !loggedIn) {
    next('/admin/signin?back='+to.fullPath);
  } else {
    next();
  }
});

export default router
