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
   if (to.meta.requiresAuth && !isAuthenticated()) {

    next('/admin/signin?back='+to.fullPath);
  } else {
    next();
  }
});

function isAuthenticated() {
  const token = localStorage.getItem('user')
  if (!token) return false

  // opcional: validar expiração do token aqui
  return true
}
export default router
