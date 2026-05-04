import type { RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue';
import ClientLayout from '@/layouts/ClientLayout.vue';
import DynamicView from '@/views/DynamicView.vue';
import PageNotFound from '@/components/common/PageNotFound.vue';
import ArticleView from '@/views/ArticleView.vue';
// import RedirectPage from '@/components/RedirectPage.vue';
// import Terms from '@/views/Terms.vue';
// import Privacy from '@/views/Privacy.vue';

const publicRoutes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'client',
        component: ClientLayout,
        children: [
            {
                path: '',
                name: 'home',
                component: Home
            },
            {
                path: '/p/:slug',
                name: 'dynamic',
                component: DynamicView
            },
            {
                path: '/:lang/:slug?',
                name: 'dynamic',
                component: DynamicView
            },
            {
                path: '/:lang/article/:slug?',
                name: 'article',
                component: ArticleView
            },
            {   
                path: "/not-found", 
                component: PageNotFound 
            },
            { path: '/:pathMatch(.*)*', component: PageNotFound },
        ],


    },
    // {
    //     path: '/terms',
    //     name: 'terms',
    //     component: Terms

    // },
    // {
    //     path: '/privacy',
    //     name: 'privacy',
    //     component: Privacy

    // },
    // {
    //     path: '/redirect/:url',
    //     name: 'Redirect',
    //     component: RedirectPage

    // },    

    // {   
    //     path: "/:pathMatch(.*)*", 
    //     component: PageNotFound 
    // }
]

export default publicRoutes

