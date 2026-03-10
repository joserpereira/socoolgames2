import { RouteRecordRaw } from 'vue-router'
// import AdminLayout from '@/components/src/views/Home.vue/AdminLayout.vue'
// import AdminLayout from '@/layouts/AppLayout.vue';
import Dashboard from '@/components/admin/Dashboard.vue';

const adminRoutes: RouteRecordRaw[] = [
    {
        path: '/admin',
        name: 'admin',
        redirect: '/admin',
        component: Dashboard,
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: () => import('@/components/admin/AdminMain.vue'),
                meta: { requiresAuth: true } 
            },             
            {
                path: '/admin/pages',
                name: 'PagesView',
                component: () => import('@/components/admin/PagesView.vue'),
                meta: { requiresAuth: true } 
            }, 
            {
                path: '/admin/upload',
                name: 'ImageUploader',
                component: () => import('@/components/admin/ImageUploader.vue'),
                meta: { requiresAuth: true } 
            }
            

    //         {
    //             path: 'links',
    //             name: 'Links',
    //             component: () => import('@/components/admin/Links.vue'),
    //             meta: { requiresAuth: true }
    //         },
    //          {
    //             path: 'files',
    //             name: 'Files',
    //             component: () => import('@/components/admin/Files.vue'),
    //             meta: { requiresAuth: true }
    //         },
    //         {
    //             path: 'categories',
    //             name: 'Categories',
    //             component: () => import('@/components/admin/Categories.vue'),
    //             meta: { requiresAuth: true }
    //         },
    //         {
    //             path: 'users',
    //             name: 'Users',
    //             component: () => import('@/components/admin/Users.vue'),
    //             meta: { requiresAuth: true }
    //         }
     
        ]
    },
    {
                path: '/admin/signin',
                name: 'SignIn',
                component: () => import('@/components/admin/Signin.vue')
            },
            {
                path: '/admin/signup',
                name: 'SignUp',
                component: () => import('@/components/admin/Signup.vue')
            }
   
]

export default adminRoutes