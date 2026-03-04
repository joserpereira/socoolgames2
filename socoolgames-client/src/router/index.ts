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
