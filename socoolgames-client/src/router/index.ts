import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import publicRoutes from './publicRoutes'
import adminRoutes from './adminRoutes'

const routes: RouteRecordRaw[] = [
  ...publicRoutes,
  ...adminRoutes
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to: any /*, from: any */) => {
   if (to.meta.requiresAuth && !isAuthenticated()) {
    return '/admin/signin?back='+to.fullPath;
  return true;
}});

function isAuthenticated() {
  const user = localStorage.getItem('user');
  if (!user) return false
  
  const u = JSON.parse(user);
  if (!u.accessToken) return false
  
  try {
    const payload = JSON.parse(atob(u.accessToken.split('.')[1]))
    return payload.exp > Date.now() / 1000
  } catch {
    return false
  }
  return true
}
export default router
